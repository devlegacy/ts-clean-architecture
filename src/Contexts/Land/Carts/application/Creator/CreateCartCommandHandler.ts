import { injectable } from 'tsyringe'

import { CartId, UserId } from '@/Contexts/Land/Shared/domain/index.js'
import { Command, type CommandHandler } from '@/Contexts/Shared/domain/index.js'

import type { CartCreator } from './CartCreator.js'
import { CreateCartCommand } from './CreateCartCommand.js'

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
