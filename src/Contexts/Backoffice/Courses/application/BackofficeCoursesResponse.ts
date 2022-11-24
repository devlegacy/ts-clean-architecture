import { BackofficeCourse, BackofficeCoursePrimitiveDto } from '../domain'

type Response = BackofficeCoursePrimitiveDto

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
