import { injectable } from 'tsyringe'

import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { CoursesCounterIncrementer } from './CoursesCounterIncrementer'

// DomainEventSubscriber - Subscriptor
@injectable()
export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId))
  }
}
