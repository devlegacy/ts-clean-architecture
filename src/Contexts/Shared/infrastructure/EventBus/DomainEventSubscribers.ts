import { container, delay } from 'tsyringe'

import { DomainEvent, DomainEventSubscriber } from '../../domain'
import { SHARED_TYPES } from '../common'

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
    const token = SHARED_TYPES.DomainEventSubscriber
    const subscribers = container.isRegistered(token)
      ? container.resolveAll<DomainEventSubscriber<DomainEvent>>(token)
      : []

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
