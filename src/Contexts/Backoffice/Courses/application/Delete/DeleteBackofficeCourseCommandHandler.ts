import { Command, ICommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseId, DeleteBackofficeCourseCommand } from '../../domain'
import { BackofficeCourseDeleter } from './BackofficeCourseDeleter'

@CommandHandler(BackofficeCourseDeleter)
export class DeleteBackofficeCourseCommandHandler implements ICommandHandler<DeleteBackofficeCourseCommand> {
  constructor(private readonly deleter: BackofficeCourseDeleter) {}

  subscribedTo(): Command {
    return DeleteBackofficeCourseCommand
  }

  async handle(command: DeleteBackofficeCourseCommand): Promise<void> {
    const id = new BackofficeCourseId(command.id)

    await this.deleter.run(id)
  }
}
