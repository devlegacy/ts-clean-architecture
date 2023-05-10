import { BlockId } from '@/Contexts/Land/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BlockDeleter } from './BlockDeleter'
import { DeleteBlockCommand } from './DeleteBlockCommand'

@CommandHandlerSubscriber(DeleteBlockCommand)
export class DeleteBlockCommandHandler implements CommandHandler<DeleteBlockCommand> {
  constructor(private readonly deleter: BlockDeleter) {}

  async handle(command: DeleteBlockCommand): Promise<void> {
    const id = new BlockId(command.id)
    await this.deleter.run(id)
  }
}
