import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'

import { BackofficeCourse, BackofficeCourseEntityDto, BackofficeCourseRepository } from '../../domain'

@injectable()
export class BackofficeCourseCreator {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(
    params: BackofficeCourseEntityDto
    // {
    //   id: BackofficeCourseId
    //   name: BackofficeCourseName
    //   duration?: BackofficeCourseDuration
    //   createdAt?: Date
    //   updatedAt?: Date
    //   // , deletedAt?: Date
    // }
  ) {
    const course = new BackofficeCourse(
      params.id,
      params.name,
      params.duration,
      params.createdAt,
      params.updatedAt
      // deletedAt
    )

    return this.repository.save(course)
  }
}
