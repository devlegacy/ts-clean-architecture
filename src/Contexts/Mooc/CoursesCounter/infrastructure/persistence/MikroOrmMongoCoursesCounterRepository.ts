import { EntitySchema } from '@mikro-orm/core'

import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/Persistence'

import { CoursesCounter, CoursesCounterRepository } from '../../domain'
import { CoursesCounterEntity } from './mikroorm/mongo/CoursesCounterEntity'

export class MikroOrmMongoCoursesCounterRepository
  extends MikroOrmMongoRepository<CoursesCounter>
  implements CoursesCounterRepository
{
  async search(): Promise<Nullable<CoursesCounter>> {
    const repository = await this.repository()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const courseCounter = await repository.findOne({ total: { $exists: true } }, { convertCustomTypes: false }) // false because we are using a custom filter
    return courseCounter
  }

  async save(counter: CoursesCounter): Promise<void> {
    return this.persist(counter)
  }

  protected entitySchema(): EntitySchema<CoursesCounter> {
    return CoursesCounterEntity
  }
}
