import { Container } from 'diod'
import { container } from 'tsyringe'

import { TAGS } from '@/apps/mooc/modules/tags'

import { DomainEvent, DomainEventSubscribers, IDomainEventSubscriber, SHARED_TYPES } from '../../domain'

// class DomainEventSubscriberTransform implements Transform<any, any> {
//   public transform(items: DomainEventSubscriber<DomainEvent>[]): DomainEventSubscriber<DomainEvent>[] {
//     return items.map((item) => {
//       return container.resolve<DomainEventSubscriber<DomainEvent>>(item as any)
//     })
//   }
// }

export class DomainEventSubscriberResolver implements DomainEventSubscribers {
  constructor(readonly items: IDomainEventSubscriber<DomainEvent>[]) {}

  static fromContainer(container: Container): DomainEventSubscribers {
    const subscribers = container
      .findTaggedServiceIdentifiers<IDomainEventSubscriber<DomainEvent>>(TAGS.DomainEventSubscriber)
      .map((subscriber) => container.get(subscriber))

    return new DomainEventSubscriberResolver(subscribers)
  }
  /**
   * HACK: To retrieve and resolve DomainEvent subscribers tokens from container
   */
  static from(token: symbol = SHARED_TYPES.DomainEventSubscriber): DomainEventSubscribers {
    // const subscriberDefinitions = [IncrementCoursesCounterOnCourseCreated]
    const subscribers = container.isRegistered(token)
      ? container.resolveAll<IDomainEventSubscriber<DomainEvent>>(token)
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
