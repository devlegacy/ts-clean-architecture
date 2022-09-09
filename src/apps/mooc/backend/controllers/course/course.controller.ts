import HttpStatus from 'http-status'

import { CourseCreator } from '@/contexts/mooc/courses/application/course.creator'
// import { updateRequestSchema } from '@/contexts/mooc/courses/infrastructure/course.schema'
import { CourseDto } from '@/contexts/mooc/courses/infrastructure/dtos/course.dto'
import {
  Body,
  Controller,
  HttpCode,
  Put
  // Req
  //  Schema
} from '@/shared/common'

@Controller('/courses')
export class CourseController {
  constructor(private courseCreator: CourseCreator) {}

  // @Schema(updateRequestSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put('/:courseId')
  async update(@Body() course: CourseDto) {
    const { id, name, duration } = course

    await this.courseCreator.run({
      id,
      name,
      duration
    })

    return {}
  }
}
