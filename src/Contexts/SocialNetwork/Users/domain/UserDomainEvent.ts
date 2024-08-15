import {
  DomainEvent,
  type DomainEventPrimitives,
  type DomainEventPrimitivesWithAttributes,
} from '#@/src/Contexts/Shared/domain/index.js'

export type UserDomainEventPrimitives = {
  id: string
}

export class UserDomainEvent extends DomainEvent implements UserDomainEventPrimitives {
  static override readonly EVENT_NAME: string = 'user.*'

  readonly id: string

  constructor({
    id,
    ...event
  }: DomainEventPrimitives<UserDomainEventPrimitives>) {
    super({
      eventName: UserDomainEvent.EVENT_NAME,
      ...event,
    })
    this.id = id
  }

  static override fromPrimitives(props: DomainEventPrimitivesWithAttributes<UserDomainEventPrimitives>): UserDomainEvent {
    const {
      eventId,
      occurredOn,
      aggregateId,
      attributes: {
        id,
      },
    } = props
    return new UserDomainEvent({
      eventId,
      occurredOn,
      aggregateId,
      id,
    })
  }

  toPrimitives(): { [key: string]: unknown } {
    return {
      id: this.id,
    }
  }
}
