import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  CourseRepository,
} from '../../domain/index.js'

@UseCase()
export class CoursesFinder {
  constructor(private readonly repository: CourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return courses
  }
}
