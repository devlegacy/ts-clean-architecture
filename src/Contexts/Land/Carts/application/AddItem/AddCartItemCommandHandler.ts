import {
  injectable,
} from 'tsyringe'

import {
  CartId,
  ItemId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  Command,
  type CommandHandler,
  Money,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CartItem,
} from '../../domain/index.js'
import {
  AddCartItemCommand,
} from './AddCartItemCommand.js'
import {
  CartItemAdder,
} from './CartItemAdder.js'

@injectable()
export class AddCartItemCommandHandler implements CommandHandler<AddCartItemCommand> {
  constructor(private readonly adder: CartItemAdder) {}

  subscribedTo(): Command {
    return AddCartItemCommand
  }

  async handle(command: AddCartItemCommand): Promise<void> {
    const item = new CartItem(
      new ItemId(command.itemId),
      new Money(
        command.price,
        command.currency,
      ),
    )
    const id = new CartId(command.id)

    await this.adder.run(
      id,
      item,
      command.quantity,
    )
  }
}
