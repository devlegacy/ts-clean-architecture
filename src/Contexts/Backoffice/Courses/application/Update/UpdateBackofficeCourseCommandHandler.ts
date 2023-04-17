import { ICommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain/Common'

import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  UpdateBackofficeCourseCommand,
} from '../../domain'
import { BackofficeCourseUpdater } from './BackofficeCourseUpdater'

@CommandHandler(UpdateBackofficeCourseCommand)
export class UpdateBackofficeCourseCommandHandler implements ICommandHandler<UpdateBackofficeCourseCommand> {
  constructor(private readonly updater: BackofficeCourseUpdater) {}

  // subscribedTo(): Command {
  //   return UpdateBackofficeCourseCommand
  // }

  async handle(command: UpdateBackofficeCourseCommand): Promise<void> {
    const { updatedAt } = command
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
