import {
  CoursesCounterNotExist,
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

@UseCase()
export class CoursesCounterFinder {
  constructor(private readonly repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (!counter) throw new CoursesCounterNotExist()

    return counter.total.value
  }
}
