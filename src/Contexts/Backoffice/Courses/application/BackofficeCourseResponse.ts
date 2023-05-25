import { BackofficeCourse, BackofficeCoursePrimitiveType } from '../domain'

// This could be different
type Response = BackofficeCoursePrimitiveType

export class BackofficeCourseResponse {
  readonly course: Response

  constructor(course: BackofficeCourse) {
    const {
      // createdAt: _createdAt,
      // updatedAt: _updatedAt,
      //, deletedAt: _deletedAt,
      ...primitives
    } = course.toPrimitives()

    this.course = primitives
  }
}
