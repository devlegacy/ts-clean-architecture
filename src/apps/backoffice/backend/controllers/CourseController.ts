import { inject } from 'tsyringe'

import {
  BackofficeCoursesResponse,
  PaginateCourses,
  SearchCoursesByCriteriaQuery
} from '@/Contexts/Backoffice/Courses/application'
import { BackofficeCreateCourseCommand } from '@/Contexts/Backoffice/Courses/domain'
import { JoiCourseDto } from '@/Contexts/Mooc/Courses/infrastructure/dtos/JoiCourseDto'
import { CommandBus, FilterPrimitiveDto, Filters, Order, OrderByCreatedAt, QueryBus } from '@/Contexts/Shared/domain'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@/Contexts/Shared/infrastructure/common'
import { FiltersPipe } from '@/Contexts/Shared/infrastructure/pipes/joi/filters.pipe'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator,
    private readonly paginateCourses: PaginateCourses,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus
  ) {}

  @Get()
  async index(
    @Query('filters', FiltersPipe) filtersDto?: FilterPrimitiveDto[],
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderType') orderType?: string
  ) {
    const query = new SearchCoursesByCriteriaQuery(
      Filters.parseFilters(filtersDto ?? []),
      orderBy,
      orderType,
      limit ? limit : undefined,
      offset ? offset : undefined
    )
    // const query = new SearchAllCoursesQuery()

    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)

    return courses
  }

  @Get('pagination')
  async pagination(
    @Query('filters', FiltersPipe) filtersDto?: FilterPrimitiveDto[],
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderType') orderType?: string
  ) {
    const parsedFilters = Filters.parseFilters(filtersDto ?? [])
    const filters = Filters.fromValues(parsedFilters)
    const order = !orderBy || !orderType ? new OrderByCreatedAt() : Order.fromValues(orderBy, orderType)

    const pagination = await this.paginateCourses.run(filters, order, limit, page)

    return pagination
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: JoiCourseDto) {
    const command = new BackofficeCreateCourseCommand(course)
    await this.commandBus.dispatch(command)

    return {}
  }
}
