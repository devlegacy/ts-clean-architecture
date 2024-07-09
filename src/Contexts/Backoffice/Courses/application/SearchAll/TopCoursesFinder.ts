import {
  BackofficeCourseRepository,
  TopCourses,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

@UseCase()
export class TopCoursesFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(top: number) {
    const courses = await this.repository.search(new TopCourses(top))

    return courses
  }
}
