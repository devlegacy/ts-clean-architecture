import { inject } from 'tsyringe'

import {
  BackofficeCourseResponse,
  BackofficeCoursesResponse,
  FindBackofficeCourseByCriteriaQuery,
  PaginateBackofficeCoursesQuery,
  PaginatedBackofficeCoursesResponse,
  SearchAllBackofficeCoursesQuery,
  SearchBackofficeCoursesByCriteriaQuery
} from '@/Contexts/Backoffice/Courses/application'
import {
  CreateBackofficeCourseCommand,
  DeleteBackofficeCourseCommand,
  UpdateBackofficeCourseCommand
} from '@/Contexts/Backoffice/Courses/domain'
import { CourseRequestDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, Filter, FilterPrimitiveDto, Operator, QueryBus } from '@/Contexts/Shared/domain'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Monitoring,
  Param,
  Post,
  Put,
  Query
} from '@/Contexts/Shared/infrastructure/common'
import { error, info } from '@/Contexts/Shared/infrastructure/Logger'
import { ObjectIdPipe } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi/Pipes'
import { FiltersPipe } from '@/Contexts/Shared/infrastructure/RequestValidation/Joi/Pipes/filters.pipe'

import { TYPES } from '../../modules/types'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator,
    @inject(TYPES.QueryBus) private readonly queryBus: QueryBus,
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    @inject(TYPES.Monitoring) private readonly monitoring: Monitoring
  ) {}

  @Get()
  async index(
    @Query('filters', FiltersPipe) filtersDto?: FilterPrimitiveDto[],
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderType') orderType?: string
  ) {
    const filters = Filter.parseFilters(filtersDto ?? [])
    const query = new SearchBackofficeCoursesByCriteriaQuery(
      filters,
      orderBy,
      orderType,
      limit ? limit : undefined,
      offset ? offset : undefined
    )
    // const query = new SearchAllCoursesQuery()

    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)

    return courses
  }

  @Get('/all')
  async all() {
    const query = new SearchAllBackofficeCoursesQuery()
    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)

    return courses
  }

  @Get('pagination')
  async pagination(
    @Query('filters', FiltersPipe) filtersDto?: FilterPrimitiveDto[],
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('orderBy') _orderBy?: string,
    @Query('orderType') _orderType?: string
  ) {
    const filters = Filter.parseFilters(filtersDto ?? [])

    const query = new PaginateBackofficeCoursesQuery(filters, limit, page)
    const pagination = await this.queryBus.ask<PaginatedBackofficeCoursesResponse>(query)
    return pagination
  }

  @Get(':courseId')
  async show(@Param('courseId', ObjectIdPipe) courseId: string) {
    const filters = Filter.parseFilters([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId
      }
    ])

    const query = new FindBackofficeCourseByCriteriaQuery(filters)
    const { course } = await this.queryBus.ask<BackofficeCourseResponse>(query)

    return course
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseRequestDto) {
    const command = new CreateBackofficeCourseCommand(course)
    this.commandBus
      .dispatch(command)
      .then((data) => info(data))
      .catch((e) => {
        this.monitoring.capture(e)
        error(e)
      })

    return course
  }

  @Put(':courseId')
  async update(@Param('courseId', ObjectIdPipe) courseId: string, @Body() course: CourseRequestDto) {
    const command = new UpdateBackofficeCourseCommand(course)
    await this.commandBus.dispatch(command)
    return course
  }

  @Delete(':courseId')
  async delete(@Param('courseId', ObjectIdPipe) courseId: string) {
    const filter = { id: courseId }
    const command = new DeleteBackofficeCourseCommand({ id: courseId })
    await this.commandBus.dispatch(command)

    return filter
  }
}
