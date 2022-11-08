import { EntitySchema } from '@mikro-orm/core'

import { Criteria } from '@/Contexts/Shared/domain'
import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/persistence'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseEntity } from './mongo/BackofficeCourseEntity'

export class MikroOrmMongoBackofficeCourseRepository
  extends MikroOrmMongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  // constructor(
  //   @inject(SHARED_TYPES.MongoClient) client: Promise<MikroORM<MongoDriver>>,
  //   @inject(SHARED_TYPES.QueryBus) private readonly queryBus: QueryBus
  // ) {
  //   super(client)
  // }

  async searchBy(_criteria: Criteria): Promise<BackofficeCourse[]> {
    return []
  }

  save(course: BackofficeCourse): Promise<void> {
    return this.persist(course)
  }

  async all(): Promise<BackofficeCourse[]> {
    // const courses = await this.queryBus.ask<CoursesResponse>(new SearchAllCoursesQuery())

    const repository = await this.repository()
    const courses = await repository.find({})

    return courses
  }

  protected entitySchema(): EntitySchema<BackofficeCourse> {
    return BackofficeCourseEntity
  }
}
