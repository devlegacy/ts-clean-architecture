import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { CourseId } from '../../../Shared/domain'
import { CoursesCounter, CoursesCounterId, CoursesCounterRepository } from '../../domain'

@injectable()
export class CoursesCounterIncrementer {
  // TECH-DEBT: TYPES es undefined por alguna razón al importar en los test
  constructor(
    @inject(TYPES?.CoursesCounterRepository) private repository: CoursesCounterRepository,
    @inject(TYPES?.EventBus) private bus: EventBus
  ) {}

  async run(courseId: CourseId) {
    const counter = (await this.repository.search()) || this.initializeCounter()

    if (!counter.hasIncremented(courseId)) {
      counter.increment(courseId)

      await this.repository.save(counter)
      await this.bus.publish(counter.pullDomainEvents())
    }
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random())
  }
}
