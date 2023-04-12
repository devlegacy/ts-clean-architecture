import { UseCase } from '@/Contexts/Shared/domain/Common'

import { CoursesCounterNotExist, CoursesCounterRepository } from '../../domain'

@UseCase()
export class CoursesCounterFinder {
  constructor(private readonly repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (!counter) throw new CoursesCounterNotExist()

    return counter.total.value
  }
}
