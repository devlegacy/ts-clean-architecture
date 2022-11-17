import { inject } from 'tsyringe'

import {
  BackofficeCourseDeleter,
  BackofficeCourseFinder,
  BackofficeCoursesResponse,
  BackofficeCourseUpdater,
  BackofficePaginateCourses,
  SearchBackofficeCoursesByCriteriaQuery
} from '@/Contexts/Backoffice/Courses/application'
import { BackofficeCreateCourseCommand } from '@/Contexts/Backoffice/Courses/domain'
import { CourseRequestDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, FilterPrimitiveDto, Filters, Order, OrderByCreatedAt, QueryBus } from '@/Contexts/Shared/domain'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from '@/Contexts/Shared/infrastructure/common'
import { MongoIdPipe } from '@/Contexts/Shared/infrastructure/pipes/joi'
import { FiltersPipe } from '@/Contexts/Shared/infrastructure/pipes/joi/filters.pipe'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator,
    private readonly paginate: BackofficePaginateCourses,
    private readonly finder: BackofficeCourseFinder,
    private readonly updater: BackofficeCourseUpdater,
    private readonly deleter: BackofficeCourseDeleter,
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
    const query = new SearchBackofficeCoursesByCriteriaQuery(
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

    const pagination = await this.paginate.run(filters, order, limit, page)

    return pagination
  }

  @Get(':courseId')
  async show(@Param('courseId', MongoIdPipe) courseId: string) {
    const course = await this.finder.run(courseId)
    return course.toPrimitives()
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseRequestDto) {
    const command = new BackofficeCreateCourseCommand(course)
    await this.commandBus.dispatch(command)

    return {}
  }

  @Put(':courseId')
  async update(@Param('courseId', MongoIdPipe) courseId: string, @Body() course: CourseRequestDto) {
    const response = await this.updater.run({
      ...course,
      id: courseId
    })
    return response.toPrimitives()
  }

  @Delete(':courseId')
  async delete(@Param('courseId', MongoIdPipe) courseId: string) {
    const response = await this.deleter.run(courseId)
    return response.toPrimitives()
  }
}
