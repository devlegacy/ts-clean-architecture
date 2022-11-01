import { EntitySchema } from '@mikro-orm/core'

import { Criteria, Nullable } from '@/Contexts/Shared/domain'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoRepository'

import { Course, CourseRepository } from '../../domain'
import { CourseEntity } from './mongo/CourseEntity'

export interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  async all(): Promise<Course[]> {
    const repository = await this.repository()
    const courses = await repository.find({})

    return courses
  }

  async searchBy(criteria: Criteria): Promise<Course[]> {
    const documents = await this.findByCriteria(criteria)

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
