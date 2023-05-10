import { Command, CommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseId, DeleteBackofficeCourseCommand } from '../../domain'
import { BackofficeCourseDeleter } from './BackofficeCourseDeleter'

@CommandHandlerSubscriber(BackofficeCourseDeleter)
export class DeleteBackofficeCourseCommandHandler implements CommandHandler<DeleteBackofficeCourseCommand> {
  constructor(private readonly deleter: BackofficeCourseDeleter) {}

  subscribedTo(): Command {
    return DeleteBackofficeCourseCommand
  }

  async handle(command: DeleteBackofficeCourseCommand): Promise<void> {
    const id = new BackofficeCourseId(command.id)

    await this.deleter.run(id)
  }
}
