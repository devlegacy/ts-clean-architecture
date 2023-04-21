import { EntitySchema } from '@mikro-orm/core'

import { Criteria } from '@/Contexts/Shared/domain'
import { MikroOrmMongoRepository } from '@/Contexts/Shared/infrastructure/persistence'

import { Course, CourseRepository } from '../../domain'
import { CourseEntity } from './mikroorm/mongo/CourseEntity'

export interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MikroOrmMongoCourseRepository extends MikroOrmMongoRepository<Course> implements CourseRepository {
  async all(): Promise<Course[]> {
    const repository = await this.repository()
    const courses = await repository.find({})

    return courses
  }

  async searchBy(criteria: Criteria): Promise<Course[]> {
    const documents = await this.matching(criteria)

    return documents
  }

  async save(course: Course): Promise<void> {
    return this.persist(course)
  }

  // async search(id: CourseId): Promise<Nullable<Course>> {
  async search(): Promise<Nullable<Course>> {
    const repository = await this.repository()
    const course = await repository.findOne({})

    return course
  }

  protected entitySchema(): EntitySchema<Course> {
    return CourseEntity
  }
}
