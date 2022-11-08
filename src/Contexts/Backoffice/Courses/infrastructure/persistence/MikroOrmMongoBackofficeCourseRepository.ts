import { EntitySchema } from '@mikro-orm/core'

import { Criteria } from '@/Contexts/Shared/domain'
import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/persistence'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseEntity } from './mongo/BackofficeCourseEntity'

export class MikroOrmMongoBackofficeCourseRepository
  extends MikroOrmMongoRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  async searchBy(_criteria: Criteria): Promise<BackofficeCourse[]> {
    return []
  }
  save(course: BackofficeCourse): Promise<void> {
    return this.persist(course)
  }

  async all(): Promise<BackofficeCourse[]> {
    const repository = await this.repository()
    const courses = await repository.find({})

    return courses
  }

  protected entitySchema(): EntitySchema<BackofficeCourse> {
    return BackofficeCourseEntity
  }
}
