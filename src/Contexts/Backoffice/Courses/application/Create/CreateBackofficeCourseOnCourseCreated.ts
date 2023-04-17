import { CourseCreatedDomainEvent } from '@/Contexts/Mooc/Courses/domain'
import { IDomainEventSubscriber } from '@/Contexts/Shared/domain'
import { DomainEventSubscriber } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseDuration, BackofficeCourseId, BackofficeCourseName } from '../../domain'
import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@DomainEventSubscriber(CourseCreatedDomainEvent)
export class CreateBackofficeCourseOnCourseCreated implements IDomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private readonly creator: BackofficeCourseCreator) {}

  // subscribedTo(): DomainEventClass[] {
  //   return [CourseCreatedDomainEvent]
  // }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const id = new BackofficeCourseId(domainEvent.aggregateId)
    const name = new BackofficeCourseName(domainEvent.name)
    const duration = domainEvent.duration ? new BackofficeCourseDuration(domainEvent.duration) : undefined
    await this.creator.run({
      id,
      name,
      duration,
    })
  }
}
