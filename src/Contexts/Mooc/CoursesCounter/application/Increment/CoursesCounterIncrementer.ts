import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../../Shared/domain'
import { CoursesCounter, CoursesCounterId, CoursesCounterRepository } from '../../domain'

@injectable()
export class CoursesCounterIncrementer {
  constructor(
    @inject(TYPES.CoursesCounterRepository) private readonly repository: CoursesCounterRepository,
    @inject(TYPES.EventBus) private readonly bus: EventBus
  ) {}

  async run(courseId: CourseId) {
    const search = await this.repository.search()
    const counter = search || this.initializeCounter()

    if (counter.hasIncremented(courseId)) return

    counter.increment(courseId)

    await this.repository.save(counter)
    await this.bus.publish(counter.pullDomainEvents())
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random())
  }
}
