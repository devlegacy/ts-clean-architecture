import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  UpdateBackofficeCourseCommand,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  CommandHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  CommandHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BackofficeCourseUpdater,
} from './BackofficeCourseUpdater.js'

@CommandHandlerSubscriber(UpdateBackofficeCourseCommand)
export class UpdateBackofficeCourseCommandHandler implements CommandHandler<UpdateBackofficeCourseCommand> {
  constructor(private readonly updater: BackofficeCourseUpdater) {}

  // subscribedTo(): Command {
  //   return UpdateBackofficeCourseCommand
  // }

  async handle(command: UpdateBackofficeCourseCommand): Promise<void> {
    const {
      updatedAt,
    } = command
    const id = new BackofficeCourseId(command.id)
    const name = new BackofficeCourseName(command.name)
    const duration = command.duration ? new BackofficeCourseDuration(command.duration) : undefined

    await this.updater.run({
      id,
      name,
      duration,
      updatedAt,
    })
  }
}
