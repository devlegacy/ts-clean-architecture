import { EventBus } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'

import { CourseId } from '../../../Shared/domain'
import { CoursesCounter, CoursesCounterId, CoursesCounterRepository } from '../../domain'

@UseCase()
export class CoursesCounterIncrementer {
  constructor(private readonly repository: CoursesCounterRepository, private readonly bus: EventBus) {}

  async run(courseId: CourseId) {
    const search = await this.repository.search()
    const counter = search || this.#initializeCounter()

    if (counter.hasIncremented(courseId)) return // push to domain and avoid other methods down

    counter.increment(courseId)

    await this.repository.save(counter)
    await this.bus.publish(counter.pullDomainEvents())
  }

  #initializeCounter(): CoursesCounter {
    const courseCounter = CoursesCounter.initialize(CoursesCounterId.random())
    return courseCounter
  }
}
