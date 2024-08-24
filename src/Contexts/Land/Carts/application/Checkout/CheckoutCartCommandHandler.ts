import {
  CartId,
  OrderId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  Command,
  type CommandHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CartCheckout,
} from './CartCheckout.js'
import {
  CheckoutCartCommand,
} from './CheckoutCartCommand.js'

export class CheckoutCartCommandHandler implements CommandHandler<CheckoutCartCommand> {
  constructor(private readonly checkout: CartCheckout) {}
  subscribedTo(): Command {
    return CheckoutCartCommand
  }

  async handle(command: CheckoutCartCommand): Promise<void> {
    this.checkout.run(
      new CartId(command.cartId),
      new OrderId(command.orderId),
    )
  }
}
