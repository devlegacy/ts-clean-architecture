import {
  ObjectId,
} from 'mongodb'

import {
  CreateCourseCommand,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  Controller,
  Get,
  Post,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  CommandBus,
} from '#@/src/Contexts/Shared/domain/index.js'

@Controller('Errors/index.js')
export class ErrorController {
  constructor(private readonly commandBus: CommandBus) {}
  @Get()
  index() {
    return {}
  }

  @Get('404')
  404() {
    return {}
  }

  @Get('500')
  500() {
    throw new Error('My custom 500')
    return {}
  }

  @Post()
  async create() {
    const id = new ObjectId().toString()
    const command = new CreateCourseCommand({
      id,
      name: id,
      duration: id,
    })
    await this.commandBus.dispatch(command)

    return {}
  }
}
