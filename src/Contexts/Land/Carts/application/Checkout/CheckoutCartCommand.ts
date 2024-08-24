import {
  Command,
} from '#@/src/Contexts/Shared/domain/index.js'

type Params = {
  cartId: string
  orderId: string
}
export class CheckoutCartCommand extends Command {
  readonly cartId: string
  readonly orderId: string

  constructor({
    cartId, orderId,
  }: Params) {
    super()
    this.cartId = cartId
    this.orderId = orderId
  }
}
