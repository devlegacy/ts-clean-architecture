import { BackofficeCourse, type BackofficeCoursePrimitiveType } from '../domain/index.js'

type Response = BackofficeCoursePrimitiveType

export class BackofficeCoursesResponse {
  readonly courses: Response[]

  constructor(courses: BackofficeCourse[]) {
    this.courses = courses.map((course) => {
      const {
        // createdAt: _createdAt,
        // updatedAt: _updatedAt,
        //, deletedAt: _deletedAt,
        ...primitives
      } = course.toPrimitives()

      return primitives
    })
  }
}
