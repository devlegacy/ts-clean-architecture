import {
  CoursesCounter,
  CoursesCounterIncrementedDomainEvent,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CoursesCounterMother,
} from './CoursesCounterMother.js'

export class CoursesCounterIncrementedDomainEventMother {
  static create(): DomainEvent {
    return CoursesCounterIncrementedDomainEventMother.fromCourseCounter(CoursesCounterMother.random())
  }

  static fromCourseCounter(counter: CoursesCounter): CoursesCounterIncrementedDomainEvent {
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    })
  }
}
