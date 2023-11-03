import { BlockId } from '@/Contexts/Land/Shared/domain/index.js'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import type { CommandHandler } from '@/Contexts/Shared/domain/index.js'

import { BlockDeleter } from './BlockDeleter.js'
import { DeleteBlockCommand } from './DeleteBlockCommand.js'

@CommandHandlerSubscriber(DeleteBlockCommand)
export class DeleteBlockCommandHandler implements CommandHandler<DeleteBlockCommand> {
  constructor(private readonly deleter: BlockDeleter) {}

  async handle(command: DeleteBlockCommand): Promise<void> {
    const id = new BlockId(command.id)
    await this.deleter.run(id)
  }
}
