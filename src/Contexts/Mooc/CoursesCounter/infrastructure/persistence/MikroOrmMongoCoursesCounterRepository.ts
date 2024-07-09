import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  CoursesCounter,
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  MikroOrmMongoRepository,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/index.js'

import {
  CoursesCounterEntity,
} from './mikroorm/mongo/CoursesCounterEntity.js'

export class MikroOrmMongoCoursesCounterRepository
  extends MikroOrmMongoRepository<CoursesCounter>
  implements CoursesCounterRepository {
  async search(): Promise<Nullable<CoursesCounter>> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const courseCounter = await repository.findOne(
      {
        total: {
          $exists: true,
        },
      },
      {
        convertCustomTypes: false,
      },
    ) // false because we are using a custom filter
    return courseCounter
  }

  async save(counter: CoursesCounter): Promise<void> {
    return this.persist(counter)
  }

  protected entitySchema(): EntitySchema<CoursesCounter> {
    return CoursesCounterEntity
  }
}
