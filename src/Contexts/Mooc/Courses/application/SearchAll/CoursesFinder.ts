import { UseCase } from '@/Contexts/Shared/domain/Common'

import { CourseRepository } from '../../domain'

@UseCase()
export class CoursesFinder {
  constructor(private readonly repository: CourseRepository) {}

  async run() {
    const courses = await this.repository.all()

    return courses
  }
}
