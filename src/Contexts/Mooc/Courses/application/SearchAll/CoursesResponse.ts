import { Response } from '@/Contexts/Shared/domain'

import { Course, CoursePrimitiveType } from '../../domain'

export class CoursesResponse extends Response {
  readonly courses: CoursePrimitiveType[]

  constructor(courses: Course[]) {
    super()
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
