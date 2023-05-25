import { Criteria } from '@/Contexts/Shared/domain'
import { MongoRepository } from '@/Contexts/Shared/infrastructure/persistence/mongo'

import { Course, CourseRepository } from '../../domain'

interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository extends MongoRepository<Course> implements CourseRepository {
  async all(): Promise<Course[]> {
    return []
  }
  async search(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  save(course: Course): Promise<void> {
    return this.persist(course.id.value, course)
  }

  async searchAll(): Promise<Course[]> {
    const collection = await this.collection()
    const documents = await collection.find<CourseDocument>({}).toArray()

    return documents.map((document) =>
      Course.fromPrimitives({
        name: document.name,
        duration: document.duration,
        id: document._id,
      })
    )
  }

  // async search(id: CourseId): Promise<Nullable<Course>> {
  //   const collection = await this.collection()
  //   const document = await collection.findOne<CourseDocument>({
  //     _id: id.value as unknown as ObjectId, // HACK: Mongo 5.0 ObjectId restriction
  //   })

  //   return document
  //     ? Course.fromPrimitives({
  //         name: document.name,
  //         duration: document.duration,
  //         id: id.value,
  //       })
  //     : null
  // }

  protected collectionName(): string {
    return 'courses'
  }
}
