import { injectable } from 'tsyringe'

import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import { CreateCourseCommand } from '../../domain'
import { CourseCreator } from './CourseCreator'

@injectable()
export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private courseCreator: CourseCreator) {}

  subscribedTo(): Command {
    return CreateCourseCommand
  }

  async handle(command: CreateCourseCommand): Promise<void> {
    // const id = new CourseId(command.id)
    // const name = new CourseName(command.name)
    // const duration = command.duration ? new CourseDuration(command.duration) : undefined
    await this.courseCreator.run(command)

    // await this.courseCreator.run({
    //   id,
    //   name,
    //   duration
    // })
  }
}
