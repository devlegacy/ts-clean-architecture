import { Course, CoursePrimitiveDto } from '../../domain'

export class CoursesResponse {
  readonly courses: CoursePrimitiveDto[]

  constructor(courses: Course[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
