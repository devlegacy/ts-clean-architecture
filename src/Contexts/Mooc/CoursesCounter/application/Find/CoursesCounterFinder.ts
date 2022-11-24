import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'

import { CoursesCounterNotExist, CoursesCounterRepository } from '../../domain'

@injectable()
export class CoursesCounterFinder {
  constructor(@inject(TYPES.CoursesCounterRepository) private readonly repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search()
    if (!counter) {
      throw new CoursesCounterNotExist()
    }

    return counter.total.value
  }
}
