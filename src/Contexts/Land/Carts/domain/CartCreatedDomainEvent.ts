import { DomainEvent } from '@/Contexts/Shared/domain/index.js'

type CreateCartDomainEventAttributes = {
  readonly userId: string
}

export class CartCreatedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'cart.created'

  readonly userId: string

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    userId,
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
      occurredOn,
    })
    this.userId = userId
  }

  toPrimitives(): CreateCartDomainEventAttributes {
    return {
      userId: this.userId,
    }
  }
}
