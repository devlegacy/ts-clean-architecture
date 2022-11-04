import { inject } from 'tsyringe'

import { SearchCoursesByCriteriaQuery } from '@/Contexts/Backoffice/Courses/application'
import { CourseCreator } from '@/Contexts/Mooc/Courses/application/CourseCreator'
import { CoursesResponse } from '@/Contexts/Mooc/Courses/application/SearchAll'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { FilterPrimitiveProps, Filters, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    private readonly courseCreator: CourseCreator
  ) {}

  @Get()
  async index(@Req() req: Request) {
    const {
      query: { filters, orderBy, order, limit, page: offset }
    } = req

    const query = new SearchCoursesByCriteriaQuery(
      Filters.parseFilters(filters as FilterPrimitiveProps[]),
      orderBy as string,
      order as string,
      limit ? Number(limit) : undefined,
      offset ? Number(offset) : undefined
    )

    const courses = await this.queryBus.ask<CoursesResponse>(query)

    return courses.courses
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseDto) {
    await this.courseCreator.run(course)

    return {}
  }
}
