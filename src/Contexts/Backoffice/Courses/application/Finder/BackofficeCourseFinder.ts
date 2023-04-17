import { UseCase } from '@/Contexts/Shared/domain/Common'

import {
  BackofficeCourse,
  BackofficeCourseFinder as DomainBackofficeCourseFinder,
  BackofficeCourseRepository,
} from '../../domain'

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
