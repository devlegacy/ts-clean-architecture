import HttpStatus from 'http-status'

import { CourseCreator } from '@/Contexts/Mooc/Courses/application'
// import { UpdateRequestSchema } from '@/Contexts/Mooc/Courses/infrastructure/CourseSchema'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import {
  Body,
  Controller,
  HttpCode,
  Put
  // Req
  //  Schema
} from '@/Contexts/Shared/infrastructure'

@Controller('courses')
export class CourseController {
  constructor(private readonly courseCreator: CourseCreator) {}

  // @Schema(UpdateRequestSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put(':courseId')
  async update(@Body() course: CourseDto) {
    // const { id, name, duration } = course

    // await this.courseCreator.run({
    //   id,
    //   name,
    //   duration
    // })

    await this.courseCreator.run(course)

    return {}
  }
}
