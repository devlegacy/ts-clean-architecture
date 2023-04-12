import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { DomainEventClass, IDomainEventSubscriber } from '@/Contexts/Shared/domain'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/Common'

import { CoursesCounterIncrementer } from './CoursesCounterIncrementer'

// DomainEventSubscriber - Subscriptor - EventHandler
@DomainEventSubscriber()
export class IncrementCoursesCounterOnCourseCreated implements IDomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId))
  }
}
