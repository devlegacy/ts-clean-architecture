import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'
import { DomainEventSubscribers } from '@/Contexts/Shared/domain/Common/index.js'
import type { DomainEventSubscriber } from '@/Contexts/Shared/domain/index.js'

import { CoursesCounterIncrementer } from './CoursesCounterIncrementer.js'

// DomainEventSubscriber - Subscriptor - EventHandler
@DomainEventSubscribers(CourseCreatedDomainEvent)
export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly incrementer: CoursesCounterIncrementer) {}

  async on(domainEvent: CourseCreatedDomainEvent) {
    const courseId = new CourseId(domainEvent.aggregateId)
    await this.incrementer.run(courseId)
  }
}
