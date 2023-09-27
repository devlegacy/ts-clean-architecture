import { Response } from '@/Contexts/Shared/domain/index.js'

import { Course, type CoursePrimitiveType } from '../../domain/index.js'

export class CoursesResponse extends Response {
  readonly courses: CoursePrimitiveType[]

  constructor(courses: Course[]) {
    super()
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
