import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'

import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  BackofficeCourseRepository
} from '../../domain'

@injectable()
export class BackofficeCourseCreator {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(id: string, name: string, duration?: string) {
    const course = new BackofficeCourse(
      new BackofficeCourseId(id),
      new BackofficeCourseName(name),
      duration ? new BackofficeCourseDuration(duration) : undefined
    )

    return this.repository.save(course)
  }
}
