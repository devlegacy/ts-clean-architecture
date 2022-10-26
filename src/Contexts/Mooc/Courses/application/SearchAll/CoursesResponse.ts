import { Course, CoursePrimitiveProps } from '../../domain'

export class CoursesResponse {
  public readonly courses: CoursePrimitiveProps[]

  constructor(courses: Course[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
