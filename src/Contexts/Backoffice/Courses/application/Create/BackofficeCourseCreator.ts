import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { BackofficeCourse, type BackofficeCourseEntityType, BackofficeCourseRepository } from '../../domain/index.js'

@UseCase()
export class BackofficeCourseCreator {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(
    params: BackofficeCourseEntityType,
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
      params.updatedAt,
      // deletedAt
    )

    await this.repository.save(course)
  }
}
