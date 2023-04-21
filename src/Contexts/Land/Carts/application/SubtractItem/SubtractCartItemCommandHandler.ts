import { injectable } from 'tsyringe'

import { CartId, ItemId } from '@/Contexts/Land/Shared/domain'
import { Command, ICommandHandler, Money } from '@/Contexts/Shared/domain'

import { CartItem } from '../../domain'
import { CartItemSubtractor } from './CartItemSubtractor'
import { SubtractCartItemCommand } from './SubtractCartItemCommand'

@injectable()
export class SubtractCartItemCommandHandler implements ICommandHandler<SubtractCartItemCommand> {
  constructor(private readonly subtractor: CartItemSubtractor) {}

  subscribedTo(): Command {
    return SubtractCartItemCommand
  }

  async handle(command: SubtractCartItemCommand): Promise<void> {
    const item = new CartItem(new ItemId(command.itemId), new Money(command.price, command.currency))
    const id = new CartId(command.id)

    await this.subtractor.run(id, item, command.quantity)
  }
}
