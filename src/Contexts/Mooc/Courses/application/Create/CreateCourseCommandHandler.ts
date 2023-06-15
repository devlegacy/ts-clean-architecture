import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { CommandHandler, isUndefined } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { CourseDuration, CourseName, CreateCourseCommand } from '../../domain'
import { CourseCreator } from './CourseCreator'

@CommandHandlerSubscriber(CreateCourseCommand)
export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly creator: CourseCreator) {}

  // @Catch()
  async handle(command: CreateCourseCommand): Promise<void> {
    const duration = !isUndefined(command.duration) ? new CourseDuration(command.duration) : undefined
    const request = {
      id: new CourseId(command.id),
      name: new CourseName(command.name),
      duration,
    }
    await this.creator.run(request)
  }

  // subscribedTo(): Command {
  //   return CreateCourseCommand
  // }
}
