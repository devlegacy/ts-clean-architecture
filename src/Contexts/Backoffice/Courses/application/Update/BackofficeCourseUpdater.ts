import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'

import {
  BackofficeCourse,
  BackofficeCourseFinder as DomainBackofficeCourseFinder,
  BackofficeCoursePrimitiveDto,
  BackofficeCourseRepository
} from '../../domain'

@injectable()
export class BackofficeCourseUpdater {
  private readonly finder: DomainBackofficeCourseFinder
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {
    this.finder = new DomainBackofficeCourseFinder(this.repository)
  }

  async run(update: BackofficeCoursePrimitiveDto): Promise<BackofficeCourse> {
    const course = await this.finder.run(update.id)
    const updated = BackofficeCourse.fromPrimitives({
      ...update,
      updatedAt: new Date(),
      createdAt: course.createdAt // DEBT: no update
    })

    const response = await this.repository.update(course, updated)
    return response
  }
}
