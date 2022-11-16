import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'

import {
  BackofficeCourse,
  BackofficeCourseFinder as DomainBackofficeCourseFinder,
  BackofficeCourseRepository
} from '../../domain'

@injectable()
export class BackofficeCourseDeleter {
  private readonly finder: DomainBackofficeCourseFinder
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {
    this.finder = new DomainBackofficeCourseFinder(this.repository)
  }

  async run(courseId: string): Promise<BackofficeCourse> {
    const course = await this.finder.run(courseId)
    const update = course
    update.delete()
    const response = await this.repository.update(course, update)
    return response
  }
}
