import { container } from 'tsyringe'

import { IncrementCoursesCounterOnCourseCreated } from '@/Contexts/Mooc/CoursesCounter/application'

import { DomainEvent, DomainEventSubscriber } from '../../domain'

export class DomainEventSubscribers {
  constructor(public items: DomainEventSubscriber<DomainEvent>[]) {}

  // static from(container: DependencyContainer): DomainEventSubscribers {
  static from(): DomainEventSubscribers {
    const subscriberDefinitions = [IncrementCoursesCounterOnCourseCreated]
    const subscribers: DomainEventSubscriber<DomainEvent>[] = []

    subscriberDefinitions.forEach((key) => {
      const domainEventSubscriber = container.resolve<DomainEventSubscriber<DomainEvent>>(key)
      subscribers.push(domainEventSubscriber)
    })

    return new DomainEventSubscribers(subscribers)
  }
}
