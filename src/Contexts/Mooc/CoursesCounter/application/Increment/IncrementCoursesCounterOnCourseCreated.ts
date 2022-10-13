import { injectable } from 'tsyringe'

import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { CoursesCounterIncrementer } from './CoursesCounterIncrementer'

// domainEventSubscriber
@injectable()
export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId))
  }
}
