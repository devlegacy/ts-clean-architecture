import { DomainEvent } from '@/Contexts/Shared/domain'

type CartItemAddedDomainEventAttributes = {
  itemId: string
  price: number
  currency: string
  quantity: number
}

export class CartItemAddedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'item.added'

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
    quantity
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
      eventName: CartItemAddedDomainEvent.EVENT_NAME,
      eventId,
      occurredOn
    })
    this.itemId = itemId
    this.price = price
    this.currency = currency
    this.quantity = quantity
  }

  toPrimitives(): CartItemAddedDomainEventAttributes {
    return {
      itemId: this.itemId,
      price: this.price,
      currency: this.currency,
      quantity: this.quantity
    }
  }
}
