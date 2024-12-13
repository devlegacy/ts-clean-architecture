import {
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/Events/DomainEvent.js'

import {
  UserDomainEvent,
} from './UserDomainEvent.js'

export type UserEmailUpdatedDomainEventPrimitives = {
  id: string
  email: string
}

export class UserEmailUpdatedDomainEvent extends UserDomainEvent implements UserEmailUpdatedDomainEventPrimitives {
  static override readonly EVENT_NAME: string = 'user.email.updated'

  email: string

  constructor({
    id,
    email,
    ...event
  }: DomainEventPrimitives<UserEmailUpdatedDomainEventPrimitives>) {
    super({
      eventName: UserEmailUpdatedDomainEvent.EVENT_NAME,
      id,
      ...event,
    })
    this.email = email
  }

  static override fromPrimitives(props: DomainEventPrimitivesWithAttributes<UserEmailUpdatedDomainEventPrimitives>): UserEmailUpdatedDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
        email,
      },
    } = props
    return new UserEmailUpdatedDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
      email,
    })
  }

  override toPrimitives(): UserEmailUpdatedDomainEventPrimitives {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
