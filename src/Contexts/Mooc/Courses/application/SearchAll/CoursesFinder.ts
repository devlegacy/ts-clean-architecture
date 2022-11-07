import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'

import { CourseRepository } from '../../domain'
import { CoursesResponse } from './CoursesResponse'

@injectable()
export class CoursesFinder {
  constructor(@inject(TYPES.CourseRepository) private readonly repository: CourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return new CoursesResponse(courses)
  }
}
