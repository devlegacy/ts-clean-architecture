import { Course, PrimitiveCourse } from '../../domain'

export class CoursesResponse {
  readonly courses: PrimitiveCourse[]

  constructor(courses: Course[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
