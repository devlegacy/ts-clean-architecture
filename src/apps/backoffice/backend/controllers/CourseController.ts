import { inject } from 'tsyringe'

import { CoursesResponse, SearchAllCoursesQuery } from '@/Contexts/Mooc/Courses/application/SearchAll'
import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus
  ) {}

  @Get()
  async index() {
    const courses = await this.queryBus.ask<CoursesResponse>(new SearchAllCoursesQuery())

    return courses
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseDto) {
    await this.commandBus.dispatch(new CreateCourseCommand(course))

    return {}
  }
}
