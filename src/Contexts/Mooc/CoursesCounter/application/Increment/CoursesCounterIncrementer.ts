import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../../Shared/domain'
import { CoursesCounter, CoursesCounterId, CoursesCounterRepository } from '../../domain'

@injectable()
export class CoursesCounterIncrementer {
  constructor(
    @inject(TYPES.CoursesCounterRepository) private readonly repository: CoursesCounterRepository,
    @inject(TYPES.EventBus) private readonly eventBus: EventBus
  ) {}

  async run(courseId: CourseId) {
    const counter = (await this.repository.search()) || this.initializeCounter()

    if (!counter.hasIncremented(courseId)) {
      counter.increment(courseId)

      await this.repository.save(counter)
      await this.eventBus.publish(counter.pullDomainEvents())
    }
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random())
  }
}
