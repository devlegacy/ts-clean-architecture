import { injectable } from 'tsyringe'

import { CartId, ItemId } from '@/Contexts/Land/Shared/domain'
import { Command, ICommandHandler, Money } from '@/Contexts/Shared/domain'

import { CartItem } from '../../domain'
import { AddCartItemCommand } from './AddCartItemCommand'
import { CartItemAdder } from './CartItemAdder'

@injectable()
export class AddCartItemCommandHandler implements ICommandHandler<AddCartItemCommand> {
  constructor(private readonly adder: CartItemAdder) {}

  subscribedTo(): Command {
    return AddCartItemCommand
  }

  async handle(command: AddCartItemCommand): Promise<void> {
    const item = new CartItem(new ItemId(command.itemId), new Money(command.price, command.currency))
    const id = new CartId(command.id)

    await this.adder.run(id, item, command.quantity)
  }
}
