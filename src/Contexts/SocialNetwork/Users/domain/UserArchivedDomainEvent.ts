import type {
  DomainEventPrimitives,
  DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  UserDomainEvent,
  type UserDomainEventPrimitives,
} from './UserDomainEvent.js'

export class UserArchivedDomainEvent extends UserDomainEvent implements UserDomainEventPrimitives {
  static override readonly EVENT_NAME: string = 'user.archived'

  constructor({
    id,
    ...event
  }: DomainEventPrimitives<UserDomainEventPrimitives>) {
    super({
      id,
      eventName: UserArchivedDomainEvent.EVENT_NAME,
      ...event,
    })
  }

  static override fromPrimitives(
    props: DomainEventPrimitivesWithAttributes<UserDomainEventPrimitives>,
  ): UserArchivedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
      },
    } = props
    return new UserArchivedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
    })
  }

  override toPrimitives(): UserDomainEventPrimitives {
    return {
      id: this.id,
    }
  }
}
