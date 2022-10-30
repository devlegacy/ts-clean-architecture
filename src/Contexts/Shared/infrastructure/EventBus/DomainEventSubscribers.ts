import { container, delay } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection'

import { DomainEvent, DomainEventSubscriber } from '../../domain'

// class DomainEventSubscriberTransform implements Transform<any, any> {
//   public transform(items: DomainEventSubscriber<DomainEvent>[]): DomainEventSubscriber<DomainEvent>[] {
//     return items.map((item) => {
//       return container.resolve<DomainEventSubscriber<DomainEvent>>(item as any)
//     })
//   }
// }

export class DomainEventSubscribers {
  constructor(public items: DomainEventSubscriber<DomainEvent>[]) {}

  // static from(container: DependencyContainer): DomainEventSubscribers {
  /**
   * HACK: To retrieve and resolve DomainEvent subscribers tokens from container
   */
  static from(): DomainEventSubscribers {
    // const subscriberDefinitions = [IncrementCoursesCounterOnCourseCreated]
    const subscribers: DomainEventSubscriber<DomainEvent>[] = container.resolveAll<DomainEventSubscriber<DomainEvent>>(
      TYPES.DomainEventSubscriber
    )

    // subscriberDefinitions.forEach((key) => {
    //   const domainEventSubscriber = container.resolve<DomainEventSubscriber<DomainEvent>>(key)
    //   subscribers.push(domainEventSubscriber)
    // })

    return new DomainEventSubscribers(subscribers)
  }

  resolveFromContainer() {
    this.items = this.items.map((key) => {
      const domainEventSubscriber = container.resolve<DomainEventSubscriber<DomainEvent>>(delay(() => key as any))
      return domainEventSubscriber
    })

    return this
  }
}
