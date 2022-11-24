import { inject } from 'tsyringe'

import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
// import { UpdateRequestSchema } from '@/Contexts/Mooc/Courses/infrastructure/CourseSchema'
import { CourseRequestDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus } from '@/Contexts/Shared/domain'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put
  // Req
  //  Schema
} from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../modules/types'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  // @Schema(UpdateRequestSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put(':courseId')
  async update(@Body() course: CourseRequestDto) {
    // const { id, name, duration } = course

    // await this.courseCreator.run({
    //   id,
    //   name,
    //   duration
    // })

    // await this.courseCreator.run(course)

    // Optimistic - Not wait
    // DEBT: Without await and crash then the app breaks
    await this.commandBus.dispatch(new CreateCourseCommand(course))

    return {}
  }
}
