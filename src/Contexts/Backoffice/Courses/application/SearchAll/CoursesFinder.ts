import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'

import { BackofficeCourseRepository } from '../../domain'

@injectable()
export class CoursesFinder {
  constructor(
    @inject(TYPES.BackofficeCourseRepository) private readonly coursesRepository: BackofficeCourseRepository
  ) {}

  async run() {
    const courses = await this.coursesRepository.all()

    return courses
  }
}
