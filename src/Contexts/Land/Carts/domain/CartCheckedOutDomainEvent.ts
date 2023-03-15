import { DomainEvent } from '@/Contexts/Shared/domain'

type CartCheckedOutDomainEventAttributes = {
  readonly orderId: string
}

export class CartCheckedOutDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'cart.checked_out'
  readonly orderId: string

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    orderId,
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
    orderId: string
  }) {
    super({
      aggregateId,
      eventName: CartCheckedOutDomainEvent.EVENT_NAME,
      eventId,
      occurredOn,
    })
    this.orderId = orderId
  }

  toPrimitives(): CartCheckedOutDomainEventAttributes {
    return {
      orderId: this.orderId,
    }
  }
}
