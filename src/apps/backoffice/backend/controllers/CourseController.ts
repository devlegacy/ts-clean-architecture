import { inject } from 'tsyringe'

import { BackofficeCoursesResponse, SearchAllCoursesQuery } from '@/Contexts/Backoffice/Courses/application'
import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  @Get()
  async index() {
    // const {
    //   query: { filters, orderBy, order, limit, page: offset }
    // } = req

    // const query = new SearchCoursesByCriteriaQuery(
    //   Filters.parseFilters(filters as FilterPrimitiveProps[]),
    //   orderBy as string,
    //   order as string,
    //   limit ? parseInt(limit, 10) : undefined,
    //   offset ? parseInt(offset, 10) : undefined
    // )
    const query = new SearchAllCoursesQuery()

    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)

    return courses
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseDto) {
    const command = new CreateCourseCommand(course)
    await this.commandBus.dispatch(command)

    return {}
  }
}
