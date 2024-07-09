import {
  BackofficeCourseId,
  DeleteBackofficeCourseCommand,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  CommandHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  Command,
  type CommandHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BackofficeCourseDeleter,
} from './BackofficeCourseDeleter.js'

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
