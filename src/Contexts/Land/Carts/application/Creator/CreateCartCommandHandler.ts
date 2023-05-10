import { injectable } from 'tsyringe'

import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import { CartCreator, CreateCartCommand } from '.'

@injectable()
export class CreateCartCommandHandler implements CommandHandler<CreateCartCommand> {
  constructor(private readonly creator: CartCreator) {}

  subscribedTo(): Command {
    return CreateCartCommand
  }

  async handle(command: CreateCartCommand): Promise<void> {
    const id = new CartId(command.id)
    const userId = new UserId(command.userId)
    await this.creator.run(id, userId)
  }
}
