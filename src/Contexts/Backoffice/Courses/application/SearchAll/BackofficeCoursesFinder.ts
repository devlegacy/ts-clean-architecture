import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { BackofficeCourseRepository } from '../../domain/index.js'

@UseCase()
export class BackofficeCoursesFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return courses
  }
}
