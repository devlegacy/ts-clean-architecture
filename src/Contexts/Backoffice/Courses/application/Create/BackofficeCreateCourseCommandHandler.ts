import { injectable } from 'tsyringe'

import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import {
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
  BackofficeCreateCourseCommand
} from '../../domain'
import { BackofficeCourseCreator } from './BackofficeCourseCreator'

@injectable()
export class BackofficeCreateCourseCommandHandler implements CommandHandler<BackofficeCreateCourseCommand> {
  constructor(private readonly courseCreator: BackofficeCourseCreator) {}

  subscribedTo(): Command {
    return BackofficeCreateCourseCommand
  }

  async handle(command: BackofficeCreateCourseCommand): Promise<void> {
    const id = new BackofficeCourseId(command.id)
    const name = new BackofficeCourseName(command.name)
    const duration = command.duration ? new BackofficeCourseDuration(command.duration) : undefined

    await this.courseCreator.run(id.value, name.value, duration?.value)
  }
}
