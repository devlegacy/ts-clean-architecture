import { inject } from 'tsyringe'

import { CoursesByCriteriaFinder } from '@/Contexts/Mooc/Courses/application'
import { CreateCourseCommand } from '@/Contexts/Mooc/Courses/domain'
// import { UpdateRequestSchema } from '@/Contexts/Mooc/Courses/infrastructure/CourseSchema'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { CommandBus, Filters, Order } from '@/Contexts/Shared/domain'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put
  // Req
  //  Schema
} from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses')
export class CourseController {
  constructor(
    @inject(TYPES.CommandBus) private readonly commandBus: CommandBus,
    private readonly coursesByCriteria: CoursesByCriteriaFinder
  ) {}

  @Get()
  async index() {
    const filterName: Map<string, string> = new Map([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'ability']
    ])

    // const filterDuration: Map<string, string> = new Map([
    //   ['field', 'duration'],
    //   ['operator', 'CONTAINS'],
    //   ['value', 'minutes']
    // ])

    const filters = Filters.fromValues([filterName] as Map<string, string>[])

    const order = Order.fromValues('id')
    const courses = await this.coursesByCriteria.run(filters, order, 6, 0)
    return courses.map((course) => course.toPrimitives())
  }

  // @Schema(UpdateRequestSchema, HttpStatus.UNPROCESSABLE_ENTITY)
  @HttpCode(HttpStatus.CREATED)
  @Put(':courseId')
  async update(@Body() course: CourseDto) {
    // const { id, name, duration } = course

    // await this.courseCreator.run({
    //   id,
    //   name,
    //   duration
    // })

    await this.commandBus.dispatch(new CreateCourseCommand(course))

    return {}
  }
}
