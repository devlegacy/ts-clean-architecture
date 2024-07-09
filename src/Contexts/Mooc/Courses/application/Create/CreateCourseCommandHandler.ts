import {
  CourseDuration,
  CourseName,
  CreateCourseCommand,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  CommandHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  type CommandHandler,
  isNil,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CourseCreator,
} from './CourseCreator.js'

@CommandHandlerSubscriber(CreateCourseCommand)
export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor(private readonly creator: CourseCreator) {}

  // @Catch()
  async handle(command: CreateCourseCommand): Promise<void> {
    const duration = !isNil(command.duration) ? new CourseDuration(command.duration) : undefined
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
