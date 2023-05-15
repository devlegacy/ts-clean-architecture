import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain'
import { DomainEventSubscribers } from '@/Contexts/Shared/domain/Common'

import { CoursesCounterIncrementer } from './CoursesCounterIncrementer'

// DomainEventSubscriber - Subscriptor - EventHandler
@DomainEventSubscribers(CourseCreatedDomainEvent)
export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly incrementer: CoursesCounterIncrementer) {}

  async on(domainEvent: CourseCreatedDomainEvent) {
    const courseId = new CourseId(domainEvent.aggregateId)
    await this.incrementer.run(courseId)
  }
}
