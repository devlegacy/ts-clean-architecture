import {
  DomainEvent,
} from '#@/src/Contexts/Shared/domain/index.js'

type CartItemSubtractedDomainEventAttributes = {
  itemId: string
  price: number
  currency: string
  quantity: number
}

export class CartItemSubtractedDomainEvent extends DomainEvent {
  static override readonly EVENT_NAME = 'item.subtracted'

  readonly itemId: string
  readonly price: number
  readonly currency: string
  readonly quantity: number

  constructor({
    aggregateId,
    eventId,
    occurredOn,
    itemId,
    price,
    currency,
    quantity,
  }: {
    aggregateId: string
    eventId?: string
    occurredOn?: Date
    itemId: string
    price: number
    currency: string
    quantity: number
  }) {
    super({
      aggregateId,
      eventName: CartItemSubtractedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn,
    })
    this.itemId = itemId
    this.price = price
    this.currency = currency
    this.quantity = quantity
  }

  toPrimitives(): CartItemSubtractedDomainEventAttributes {
    return {
      itemId: this.itemId,
      price: this.price,
      currency: this.currency,
      quantity: this.quantity,
    }
  }
}
