import { injectable } from 'tsyringe'

import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  CreateBackofficeCourseCommand,
} from '../../domain'
import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@injectable()
export class CreateBackofficeCourseCommandHandler implements CommandHandler<CreateBackofficeCourseCommand> {
  constructor(private readonly creator: BackofficeCourseCreator) {}

  subscribedTo(): Command {
    return CreateBackofficeCourseCommand
  }

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
