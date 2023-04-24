import { BlockId } from '@/Contexts/Land/Shared/domain'
import { ICommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain/Common'

import { BlockDeleter } from './BlockDeleter'
import { DeleteBlockCommand } from './DeleteBlockCommand'

@CommandHandler(DeleteBlockCommand)
export class DeleteBlockCommandHandler implements ICommandHandler<DeleteBlockCommand> {
  constructor(private readonly deleter: BlockDeleter) {}

  async handle(command: DeleteBlockCommand): Promise<void> {
    const id = new BlockId(command.id)
    await this.deleter.run(id)
  }
}
