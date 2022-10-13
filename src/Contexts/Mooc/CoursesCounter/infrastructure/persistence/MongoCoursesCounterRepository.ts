import { EntitySchema } from '@mikro-orm/core'

import { Nullable } from '@/Contexts/Shared/domain'
import { MongoRepository } from '@/Contexts/Shared/infrastructure'

import { CoursesCounter, CoursesCounterRepository } from '../../domain'
import { CoursesCounterEntity } from './mongo/CoursesCounterEntity'

export class MongoCoursesCounterRepository extends MongoRepository<CoursesCounter> implements CoursesCounterRepository {
  async search(): Promise<Nullable<CoursesCounter>> {
    return null
  }

  async save(counter: CoursesCounter): Promise<void> {
    return this.persist(counter)
  }

  protected entitySchema(): EntitySchema<CoursesCounter> {
    return CoursesCounterEntity
  }
}
