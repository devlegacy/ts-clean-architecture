import type { Container } from 'diod'
import { container } from 'tsyringe'

import { TAGS } from '@/apps/mooc/modules/tags.js'

import {
  DomainEvent,
  type DomainEventSubscriber,
  type DomainEventSubscribers,
  SHARED_TYPES,
} from '../../domain/index.js'

// class DomainEventSubscriberTransform implements Transform<any, any> {
//   public transform(items: DomainEventSubscriber<DomainEvent>[]): DomainEventSubscriber<DomainEvent>[] {
//     return items.map((item) => {
//       return container.resolve<DomainEventSubscriber<DomainEvent>>(item as any)
//     })
//   }
// }

export class DomainEventSubscriberResolver implements DomainEventSubscribers {
  // cant be private for testing
  constructor(readonly items: DomainEventSubscriber<DomainEvent>[]) {}

  static fromContainer(container: Container): DomainEventSubscribers {
    const subscribers = container
      .findTaggedServiceIdentifiers<DomainEventSubscriber<DomainEvent>>(TAGS.DomainEventSubscriber)
      .map((subscriber) => container.get(subscriber))

    const subscriber = new DomainEventSubscriberResolver(subscribers)
    return subscriber
  }
  /**
   * HACK: To retrieve and resolve DomainEvent subscribers tokens from container
   */
  static from(token: symbol = SHARED_TYPES.DomainEventSubscriber): DomainEventSubscribers {
    // const subscriberDefinitions = [IncrementCoursesCounterOnCourseCreated]
    const subscribers = container.isRegistered(token)
      ? container.resolveAll<DomainEventSubscriber<DomainEvent>>(token)
      : []

    // subscriberDefinitions.forEach((key) => {
    //   const domainEventSubscriber = container.resolve<DomainEventSubscriber<DomainEvent>>(key)
    //   subscribers.push(domainEventSubscriber)
    // })

    return new DomainEventSubscriberResolver(subscribers)
  }

  resolveFromContainer() {
    // const _items = this.items.map((key) => {
    //   const domainEventSubscriber = container.resolve<IDomainEventSubscriber<DomainEvent>>(delay(() => key as any))
    //   return domainEventSubscriber
    // })

    return this
  }
}
