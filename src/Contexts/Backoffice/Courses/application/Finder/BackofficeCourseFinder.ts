import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'

import {
  BackofficeCourse,
  BackofficeCourseFinder as DomainBackofficeCourseFinder,
  BackofficeCourseRepository,
} from '../../domain'

@injectable()
export class BackofficeCourseFinder {
  private readonly finder: DomainBackofficeCourseFinder
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {
    this.finder = new DomainBackofficeCourseFinder(this.repository)
  }

  async run(courseId: string): Promise<BackofficeCourse> {
    const course = this.finder.run(courseId)
    return course
  }
}
