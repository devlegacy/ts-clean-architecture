import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  BackofficeCourse,
  BackofficeCourseFinder as DomainBackofficeCourseFinder,
  BackofficeCourseRepository,
} from '../../domain/index.js'

@UseCase()
export class BackofficeCourseFinder {
  private readonly finder: DomainBackofficeCourseFinder
  constructor(private readonly repository: BackofficeCourseRepository) {
    this.finder = new DomainBackofficeCourseFinder(this.repository)
  }

  async run(courseId: string): Promise<BackofficeCourse> {
    const course = this.finder.run(courseId)
    return course
  }
}
