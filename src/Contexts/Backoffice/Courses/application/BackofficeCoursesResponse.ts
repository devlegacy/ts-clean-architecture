import { BackofficeCourse, BackofficeCoursePrimitiveDto } from '../domain'

// This could be different
export type BackofficeCourseResponse = BackofficeCoursePrimitiveDto

export class BackofficeCoursesResponse {
  readonly courses: BackofficeCourseResponse[]

  constructor(courses: BackofficeCourse[]) {
    this.courses = courses.map((course) => {
      const {
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        deletedAt: _deletedAt,
        ...primitives
      } = course.toPrimitives()

      return primitives
    })
  }
}
