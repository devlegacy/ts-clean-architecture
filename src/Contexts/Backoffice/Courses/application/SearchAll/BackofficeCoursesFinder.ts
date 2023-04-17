import { UseCase } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseRepository } from '../../domain'

@UseCase()
export class BackofficeCoursesFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return courses
  }
}
