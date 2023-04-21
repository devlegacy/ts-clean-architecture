import { Command, ICommandHandler } from '@/Contexts/Shared/domain'

import { CreatePriceCommand } from './CreatePriceCommand'

export class CreatePriceCommandHandler implements ICommandHandler<CreatePriceCommand> {
  subscribedTo(): Command {
    return CreatePriceCommand
  }

  handle(_command: CreatePriceCommand): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
