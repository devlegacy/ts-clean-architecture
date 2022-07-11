import HttpStatus from 'http-status'

import { CourseCreator } from '@/contexts/mooc/courses/application/course.creator'
import {
  Body,
  Controller,
  HttpCode,
  Put
  // Req
  //  Schema
} from '@/shared/common'

// import { updateSchema } from './course.schema'
import { CourseDto } from './dtos/course.dto'

@Controller('/courses')
export class CourseController {
  constructor(private courseCreator: CourseCreator) {}

  // @Schema(updateSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put('/:course')
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
