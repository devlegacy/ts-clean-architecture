import { DomainEvent } from '@/Contexts/Shared/domain'

type CreateCartDomainEventAttributes = {
  readonly userId: string
}

export class CartCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cart.created'

  readonly userId: string

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    userId
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
    userId: string
  }) {
    super({
      aggregateId,
      eventName: CartCreatedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn
    })
    this.userId = userId
  }

  toPrimitives(): CreateCartDomainEventAttributes {
    return {
      userId: this.userId
    }
  }
}
