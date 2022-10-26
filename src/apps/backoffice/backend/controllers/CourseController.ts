import { inject } from 'tsyringe'

import { SearchCoursesByCriteriaQuery } from '@/Contexts/Backoffice/Courses/application'
import { CoursesResponse } from '@/Contexts/Mooc/Courses/application/SearchAll'
import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

type FilterType = { value: string; operator: string; field: string }

@Controller('courses')
export class CourseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus
  ) {}

  @Get()
  async index(@Req() req: Request) {
    const {
      query: { filters, orderBy, order, limit, page: offset }
    } = req

    const query = new SearchCoursesByCriteriaQuery(
      this.parseFilters(filters as FilterType[]),
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
    await this.commandBus.dispatch(new CreateCourseCommand(course))

    return {}
  }

  private parseFilters(params: FilterType[]): Map<string, string>[] {
    if (!params) {
      return new Array<Map<string, string>>()
    }

    return params.map((filter) => {
      const { field } = filter
      const { value } = filter
      const { operator } = filter

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value]
      ])
    })
  }
}
