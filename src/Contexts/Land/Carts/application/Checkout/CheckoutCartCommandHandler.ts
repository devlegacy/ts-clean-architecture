import { CartId, OrderId } from '@/Contexts/Land/Shared/domain'
import { Command, ICommandHandler } from '@/Contexts/Shared/domain'

import { CartCheckout } from './CartCheckout'
import { CheckoutCartCommand } from './CheckoutCartCommand'

export class CheckoutCartCommandHandler implements ICommandHandler<CheckoutCartCommand> {
  constructor(private readonly checkout: CartCheckout) {}
  subscribedTo(): Command {
    return CheckoutCartCommand
  }

  async handle(command: CheckoutCartCommand): Promise<void> {
    this.checkout.run(new CartId(command.cartId), new OrderId(command.orderId))
  }
}
