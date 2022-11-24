import { injectable } from 'tsyringe'

import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { DomainEventClass, DomainEventSubscriber } from '@/Contexts/Shared/domain'

import { BackofficeCourseDuration, BackofficeCourseId, BackofficeCourseName } from '../../domain'
import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@injectable()
export class CreateBackofficeCourseOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly creator: BackofficeCourseCreator) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const id = new BackofficeCourseId(domainEvent.aggregateId)
    const name = new BackofficeCourseName(domainEvent.name)
    const duration = domainEvent.duration ? new BackofficeCourseDuration(domainEvent.duration) : undefined
    return this.creator.run({
      id,
      name,
      duration
    })
  }
}
