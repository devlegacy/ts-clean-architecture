import { CourseId } from '@/Contexts/Mooc/Shared/domain/courses/CourseId'
import { Nullable } from '@/Contexts/Shared/domain/nullable'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistance/mongo/mongo.repository'

import { Course } from '../../domain/course'
import { CourseRepository } from '../../domain/course.repository'

export interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  public save(course: Course): Promise<void> {
    return this.persist(course.id.value, course)
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.collection()
    const document = await collection.findOne<CourseDocument>({ _id: id.value })

    return document
      ? Course.fromPrimitives({
          name: document.name,
          duration: document.duration,
          id: id.value
        })
      : null
  }

  protected collectionName(): string {
    return 'courses'
  }
}
