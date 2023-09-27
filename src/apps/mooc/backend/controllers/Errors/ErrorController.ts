import { ObjectId } from 'mongodb'

import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain/index.js'
import { Controller, Get, Post } from '@/Contexts/Shared/domain/Common/index.js'
import { CommandBus } from '@/Contexts/Shared/domain/index.js'

@Controller('errors')
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
