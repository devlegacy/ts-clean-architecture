import { AggregateRoot, Entity, Primitives } from '@/Contexts/Shared/domain'

import { CartId, OrderId, UserId } from '../../Shared/domain'
import { CartAlreadyCheckoutException } from './CartAlreadyCheckoutException'
import { CartCheckedOutDomainEvent } from './CartCheckedOutDomainEvent'
import { CartCreatedDomainEvent } from './CartCreatedDomainEvent'
import { CartIsEmptyException } from './CartIsEmptyException'
import { CartItem } from './CartItem'
import { CartItemAddedDomainEvent } from './CartItemAddedDomainEvent'
import { CartItemIsNotInCartException } from './CartItemIsNotInCartException'
import { CartItems } from './CartItems'
import { CartItemSubtractedDomainEvent } from './CartItemSubtractedEvent'
import { CartCheckout } from './value-object'

export type CartEntityDto = Entity<Cart>
export type CartPrimitiveDto = Primitives<Cart>

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

  static fromPrimitives(data: CartPrimitiveDto) {
    const cart = new Cart(new CartId(data.id), new UserId(data.userId), new CartCheckout(data.checkout))
    return cart
  }

  static create(id: CartId, userId: UserId, checkout?: CartCheckout) {
    const cart = new Cart(id, userId, checkout)
    const event = new CartCreatedDomainEvent({
      aggregateId: cart.id.value,
      userId: cart.userId.value
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
      quantity
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
      quantity: this.#cartItems.get(cartItem)!.value < quantity ? this.#cartItems.get(cartItem)!.value : quantity
    })
    this.record(event)
  }

  applyCheckout(orderId: OrderId) {
    this.areThereItems()
    this.isCheckoutAvailable()
    const event = new CartCheckedOutDomainEvent({
      aggregateId: this.id.value,
      orderId: orderId.value
    })
    this.record(event)
  }

  areThereItems() {
    if (!this.#cartItems.size) throw new CartIsEmptyException()
  }

  isCheckoutAvailable() {
    if (this.checkout) throw new CartAlreadyCheckoutException()
  }

  toPrimitives(): CartPrimitiveDto {
    return {
      id: this.id.value,
      userId: this.id.value,
      checkout: this.checkout.value
    }
  }

  // private onCartCreated() {}
  // private onCartCheckout() {}

  private existsItemInCart(cartItem: CartItem) {
    if (!this.#cartItems?.has(cartItem)) throw new CartItemIsNotInCartException()
  }
}
