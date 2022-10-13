import { injectable } from 'tsyringe'

import { CoursesCounterNotExist, CoursesCounterRepository } from '../../domain'

@injectable()
export class CoursesCounterFinder {
  constructor(private repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (!counter) {
      throw new CoursesCounterNotExist()
    }

    return counter.total.value
  }
}
