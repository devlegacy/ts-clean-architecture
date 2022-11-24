import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'

import { BackofficeCourseRepository, TopCourses } from '../../domain'

@injectable()
export class TopCoursesFinder {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(top: number) {
    const courses = await this.repository.searchBy(new TopCourses(top))

    return courses
  }
}
