import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { CommandHandler } from '@/Contexts/Shared/domain'
import { CommandHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { CourseDuration, CourseName, CreateCourseCommand } from '../../domain'
import { CourseCreator } from './CourseCreator'

@CommandHandlerSubscriber(CreateCourseCommand)
export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly creator: CourseCreator) {}

  // @Catch()
  async handle(command: CreateCourseCommand): Promise<void> {
    const request = {
      id: new CourseId(command.id),
      name: new CourseName(command.name),
      duration: CourseDuration.create(command.duration),
    }
    await this.creator.run(request)
  }

  // subscribedTo(): Command {
  //   return CreateCourseCommand
  // }
}
