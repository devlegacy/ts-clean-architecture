import {
  BackofficeCourseResponse,
  BackofficeCoursesPaginatedResponse,
  BackofficeCoursesResponse,
  FindBackofficeCourseByCriteriaQuery,
  GetPaginatedBackofficeCoursesQuery,
  SearchAllBackofficeCoursesQuery,
  SearchBackofficeCoursesByCriteriaQuery,
} from '@/Contexts/Backoffice/Courses/application/index.js'
import {
  CreateBackofficeCourseCommand,
  DeleteBackofficeCourseCommand,
  UpdateBackofficeCourseCommand,
} from '@/Contexts/Backoffice/Courses/domain/index.js'
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
  Query,
} from '@/Contexts/Shared/domain/Common/index.js'
import {
  CommandBus,
  Filter,
  type FilterPrimitiveType,
  Monitoring,
  Operator,
  QueryBus,
} from '@/Contexts/Shared/domain/index.js'
import { error, info } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import {
  JoiFiltersPipe,
  JoiObjectIdPipe,
} from '@/Contexts/Shared/infrastructure/RequestSchemaValidation/Joi/Pipes/index.js'

import { CourseRequestSchema } from './validation/index.js'

@Controller('courses')
export class CourseController {
  constructor(
    // private readonly courseCreator: CourseCreator,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly monitoring: Monitoring,
  ) {}

  @Get()
  async index(
    @Query('filters', JoiFiltersPipe) filters?: FilterPrimitiveType[],
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderType') orderType?: string,
  ) {
    const query = new SearchBackofficeCoursesByCriteriaQuery(
      Filter.parse(filters ?? []),
      orderBy,
      orderType,
      limit, // ? limit : undefined,
      offset, //? offset : undefined
    )
    // const query = new SearchAllCoursesQuery()

    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)
    // const { reviews } = await this.queryBus.ask<BackofficeCoursesResponse>(query)
    // const { starts } = await this.queryBus.ask<BackofficeCoursesResponse>(query)
    // Promise.all([]) with an special response
    return courses
  }

  @Get('all')
  async all() {
    const query = new SearchAllBackofficeCoursesQuery()
    const { courses } = await this.queryBus.ask<BackofficeCoursesResponse>(query)

    return courses
  }

  @Get('pagination')
  async pagination(
    @Query('filters', JoiFiltersPipe) filtersDto?: FilterPrimitiveType[],
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('orderBy') _orderBy?: string,
    @Query('orderType') _orderType?: string,
  ) {
    const filters = Filter.parse(filtersDto ?? [])

    const query = new GetPaginatedBackofficeCoursesQuery(filters, limit, page)
    const pagination = await this.queryBus.ask<BackofficeCoursesPaginatedResponse>(query)
    return pagination
  }

  @Get(':courseId')
  async show(@Param('courseId', JoiObjectIdPipe) courseId: string) {
    const filters = Filter.parse([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId,
      },
    ])

    const query = new FindBackofficeCourseByCriteriaQuery(filters)
    const { course } = await this.queryBus.ask<BackofficeCourseResponse>(query)

    return course
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() course: CourseRequestSchema) {
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
  async update(@Param('courseId', JoiObjectIdPipe) courseId: string, @Body() course: CourseRequestSchema) {
    const command = new UpdateBackofficeCourseCommand(course)
    await this.commandBus.dispatch(command)
    return course
  }

  @Delete(':courseId')
  async delete(@Param('courseId', JoiObjectIdPipe) courseId: string) {
    const filter = { id: courseId }
    const command = new DeleteBackofficeCourseCommand({ id: courseId })
    await this.commandBus.dispatch(command)

    return filter
  }
}
