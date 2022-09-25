import { EntitySchema } from '@mikro-orm/core'

import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoRepository'

import { Course } from '../../domain/Course'
import { CourseRepository } from '../../domain/CourseRepository'
import { CourseEntity } from './mongo/CourseEntity'

export interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  save(course: Course): Promise<void> {
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
