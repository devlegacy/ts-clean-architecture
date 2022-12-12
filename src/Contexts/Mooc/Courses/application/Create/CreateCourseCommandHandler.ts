import { injectable } from 'tsyringe'

import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { Catch, Command, CommandHandler } from '@/Contexts/Shared/domain'

import { CourseDuration, CourseName, CreateCourseCommand } from '../../domain'
import { CourseCreator } from './CourseCreator'

@injectable()
export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly courseCreator: CourseCreator) {}

  @Catch()
  async handle(command: CreateCourseCommand): Promise<void> {
    const id = new CourseId(command.id)
    const name = new CourseName(command.name)
    const duration = command.duration ? new CourseDuration(command.duration) : undefined

    await this.courseCreator.run({
      id,
      name,
      duration
    })
  }

  subscribedTo(): Command {
    return CreateCourseCommand
  }
}
