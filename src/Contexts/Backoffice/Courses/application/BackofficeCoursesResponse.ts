import { BackofficeCourse } from '../domain'

export interface BackofficeCourseResponse {
  id: string
  name: string
  duration?: string
}

export class BackofficeCoursesResponse {
  readonly courses: BackofficeCourseResponse[]

  constructor(courses: BackofficeCourse[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
