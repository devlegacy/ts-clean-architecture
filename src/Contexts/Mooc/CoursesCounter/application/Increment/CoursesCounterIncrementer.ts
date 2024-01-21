import { Course } from '@/Contexts/Mooc/Courses/domain/index.js'
import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { EventBus } from '@/Contexts/Shared/domain/index.js'

import { CoursesCounter, CoursesCounterId, CoursesCounterRepository } from '../../domain/index.js'

@UseCase()
export class CoursesCounterIncrementer {
  constructor(
    private readonly repository: CoursesCounterRepository,
    private readonly bus: EventBus,
  ) {}

  async run(courseId: Course['id']) {
    const search = await this.repository.search()
    const counter = search || this.#initializeCounter()

    // Idempotencia - Evitar repetición
    // alternativas, tirar de infraestructura con un redis y usar el eventId o el ocurredOn
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
