import { AggregateRoot } from '@/Contexts/Shared/domain/index.js'

import { CartId, OrderId, UserId } from '../../Shared/domain/index.js'
import { CartAlreadyCheckoutError } from './CartAlreadyCheckoutError.js'
import { CartCheckedOutDomainEvent } from './CartCheckedOutDomainEvent.js'
import { CartCreatedDomainEvent } from './CartCreatedDomainEvent.js'
import { CartIsEmptyError } from './CartIsEmptyError.js'
import { CartItem } from './CartItem.js'
import { CartItemAddedDomainEvent } from './CartItemAddedDomainEvent.js'
import { CartItemIsNotInCartError } from './CartItemIsNotInCartError.js'
import { CartItems } from './CartItems.js'
import { CartItemSubtractedDomainEvent } from './CartItemSubtractedEvent.js'
import { CartCheckout } from './ValueObjects/index.js'

export type CartEntityType = Entity<Cart>
export type CartPrimitiveType = Primitives<Cart>

export class Cart extends AggregateRoot {
  readonly id: CartId
  readonly userId: UserId
  readonly checkout: CartCheckout = new CartCheckout(false)

  #cartItems = new CartItems()

  constructor(id: CartId, userId: UserId, checkout?: CartCheckout) {
    super()
    this.id = id
    this.userId = userId
    this.checkout = checkout ? checkout : new CartCheckout(false)
  }

  static override fromPrimitives(data: CartPrimitiveType) {
    const cart = new Cart(new CartId(data.id), new UserId(data.userId), new CartCheckout(data.checkout))
    return cart
  }

  static create(id: CartId, userId: UserId, checkout?: CartCheckout) {
    const cart = new Cart(id, userId, checkout)
    const event = new CartCreatedDomainEvent({
      aggregateId: cart.id.value,
      userId: cart.userId.value,
    })
    cart.record(event)

    return cart
  }

  addItem(cartItem: CartItem, quantity: number) {
    const event = new CartItemAddedDomainEvent({
      aggregateId: this.id.value,
      itemId: cartItem.itemId.value,
      price: cartItem.price.amount,
      currency: cartItem.price.currency,
      quantity,
    })
    this.record(event)
  }

  subtractItem(cartItem: CartItem, quantity: number) {
    this.existsItemInCart(cartItem)
    const event = new CartItemSubtractedDomainEvent({
      aggregateId: this.id.value,
      itemId: cartItem.itemId.value,
      price: cartItem.price.amount,
      currency: cartItem.price.currency,
      quantity: this.#cartItems.get(cartItem)!.value < quantity ? this.#cartItems.get(cartItem)!.value : quantity,
    })
    this.record(event)
  }

  applyCheckout(orderId: OrderId) {
    this.areThereItems()
    this.isCheckoutAvailable()
    const event = new CartCheckedOutDomainEvent({
      aggregateId: this.id.value,
      orderId: orderId.value,
    })
    this.record(event)
  }

  areThereItems() {
    if (!this.#cartItems.size) throw new CartIsEmptyError()
  }

  isCheckoutAvailable() {
    if (this.checkout) throw new CartAlreadyCheckoutError()
  }

  toPrimitives(): CartPrimitiveType {
    return {
      id: this.id.value,
      userId: this.id.value,
      checkout: this.checkout.value,
    }
  }

  // private onCartCreated() {}
  // private onCartCheckout() {}

  private existsItemInCart(cartItem: CartItem) {
    if (!this.#cartItems?.has(cartItem)) throw new CartItemIsNotInCartError()
  }
}
