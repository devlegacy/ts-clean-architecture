import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain/index.js'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  // Req
  // Schema
} from '@/Contexts/Shared/domain/Common/index.js'
import { CommandBus } from '@/Contexts/Shared/domain/index.js'

import { CourseRequestSchema } from './validations/index.js'

@Controller('courses')
export class CourseController {
  // collaboration using DI
  constructor(
    // private readonly courseCreator: CourseCreator // class (implementation) coupling - interface extraction isn't needed, desacoplar por desacoplar a veces no tiene razón de ser
    private readonly commandBus: CommandBus // decoupling with an interface
  ) {}

  // @Schema(UpdateRequestSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put(':id')
  async update(@Body() course: CourseRequestSchema) {
    // async update(req: Request<{ Body: CourseRequestDto }>) {
    // const { id, name, duration } = course

    // await this.courseCreator.run({
    //   id,
    //   name,
    //   duration
    // })

    // await this.courseCreator.run(course)

    // Optimistic - Not wait (?)
    // await this.commandBus.dispatch(new CreateCourseCommand(req.body))
    const command = new CreateCourseCommand(course)
    await this.commandBus.dispatch(command)

    return {}
  }
}
