import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { ICommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain/Common'

import { CourseDuration, CourseName, CreateCourseCommand } from '../../domain'
import { CourseCreator } from './CourseCreator'

@CommandHandler(CreateCourseCommand)
export class CreateCourseCommandHandler implements ICommandHandler<CreateCourseCommand> {
  constructor(private readonly creator: CourseCreator) {}

  // @Catch()
  async handle(command: CreateCourseCommand): Promise<void> {
    const id = new CourseId(command.id)
    const name = new CourseName(command.name)
    const duration = CourseDuration.create(command.duration)

    await this.creator.run({
      id,
      name,
      duration,
    })
  }

  // subscribedTo(): Command {
  //   return CreateCourseCommand
  // }
}
