import {
  CourseCreatedDomainEvent,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  DomainEventSubscribers,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  DomainEventSubscriber,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '../../domain/index.js'
import {
  BackofficeCourseCreator,
} from './BackofficeCourseCreator.js'

@DomainEventSubscribers(CourseCreatedDomainEvent)
export class CreateBackofficeCourseOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
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
