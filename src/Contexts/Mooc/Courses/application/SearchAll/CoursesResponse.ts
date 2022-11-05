import { Course, CoursePrimitiveProps } from '../../domain'

export class CoursesResponse {
  readonly courses: CoursePrimitiveProps[]

  constructor(courses: Course[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
