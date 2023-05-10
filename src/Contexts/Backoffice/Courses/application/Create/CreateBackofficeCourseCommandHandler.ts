import { CommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  CreateBackofficeCourseCommand,
} from '../../domain'
import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@CommandHandlerSubscriber(CreateBackofficeCourseCommand)
export class CreateBackofficeCourseCommandHandler implements CommandHandler<CreateBackofficeCourseCommand> {
  constructor(private readonly creator: BackofficeCourseCreator) {}

  // subscribedTo(): Command {
  //   return CreateBackofficeCourseCommand
  // }

  async handle(command: CreateBackofficeCourseCommand): Promise<void> {
    const id = new BackofficeCourseId(command.id)
    const name = new BackofficeCourseName(command.name)
    const duration = command.duration ? new BackofficeCourseDuration(command.duration) : undefined

    await this.creator.run({
      id,
      name,
      duration,
    })
  }
}
