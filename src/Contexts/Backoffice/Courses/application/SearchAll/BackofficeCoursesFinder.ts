import {
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

@UseCase()
export class BackofficeCoursesFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return courses
  }
}
