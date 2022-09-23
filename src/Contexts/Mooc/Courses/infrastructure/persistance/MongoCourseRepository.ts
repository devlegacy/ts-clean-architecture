import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { Nullable } from '@/Contexts/Shared/domain/Nullable'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoRepository'

import { Course } from '../../domain/Course'
import { CourseRepository } from '../../domain/CourseRepository'

export interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  save(course: Course): Promise<void> {
    return this.persist(course.id.value, course)
  }

  async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.collection()
    const document = await collection.findOne<CourseDocument>({ _id: id.value })

    const course = document
      ? Course.fromPrimitives({
          name: document.name,
          duration: document.duration,
          id: id.value
        })
      : null

    return course
  }

  protected collectionName(): string {
    return 'courses'
  }
}
