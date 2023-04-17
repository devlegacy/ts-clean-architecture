import { UseCase } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseRepository, TopCourses } from '../../domain'

@UseCase()
export class TopCoursesFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(top: number) {
    const courses = await this.repository.searchBy(new TopCourses(top))

    return courses
  }
}
