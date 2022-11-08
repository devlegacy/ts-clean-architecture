import { injectable } from 'tsyringe'

import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@injectable()
export class CreateBackofficeCourseOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly creator: BackofficeCourseCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const { aggregateId, duration, name } = domainEvent

    return this.creator.run(aggregateId, name, duration)
  }
}
