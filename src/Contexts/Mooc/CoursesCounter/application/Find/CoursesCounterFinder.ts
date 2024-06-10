import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  CoursesCounterNotExist, CoursesCounterRepository,
} from '../../domain/index.js'

@UseCase()
export class CoursesCounterFinder {
  constructor(private readonly repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (!counter) throw new CoursesCounterNotExist()

    return counter.total.value
  }
}
