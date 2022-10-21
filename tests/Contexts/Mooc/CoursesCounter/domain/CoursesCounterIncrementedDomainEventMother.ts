import { CoursesCounter, CoursesCounterIncrementedDomainEvent } from '@/Contexts/Mooc/CoursesCounter/domain'
import { DomainEvent } from '@/Contexts/Shared/domain'

import { CoursesCounterMother } from './CoursesCounterMother'

export class CoursesCounterIncrementedDomainEventMother {
  static create(): DomainEvent {
    return CoursesCounterIncrementedDomainEventMother.fromCourseCounter(CoursesCounterMother.random())
  }

  static fromCourseCounter(counter: CoursesCounter): CoursesCounterIncrementedDomainEvent {
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value
    })
  }
}
