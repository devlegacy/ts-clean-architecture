import { injectable } from 'tsyringe'

import { BlockId } from '@/Contexts/Land/Shared/domain'
import { Command, ICommandHandler } from '@/Contexts/Shared/domain'

import { BlockDeleter } from './BlockDeleter'
import { DeleteBlockCommand } from './DeleteBlockCommand'

@injectable()
export class DeleteBlockCommandHandler implements ICommandHandler<DeleteBlockCommand> {
  constructor(private readonly deleter: BlockDeleter) {}

  async handle(command: DeleteBlockCommand): Promise<void> {
    const id = new BlockId(command.id)
    await this.deleter.run(id)
  }

  subscribedTo(): Command {
    return DeleteBlockCommand
  }
}
