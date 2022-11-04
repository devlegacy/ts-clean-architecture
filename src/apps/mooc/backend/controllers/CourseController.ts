import { CourseCreator, CoursesByCriteriaFinder } from '@/Contexts/Mooc/Courses/application'
// import { UpdateRequestSchema } from '@/Contexts/Mooc/Courses/infrastructure/CourseSchema'
import { CourseDto } from '@/Contexts/Mooc/Courses/infrastructure'
import { Filters, Order } from '@/Contexts/Shared/domain'
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

@Controller('courses')
export class CourseController {
  constructor(
    private readonly coursesByCriteria: CoursesByCriteriaFinder,
    private readonly courseCreator: CourseCreator
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

    await this.courseCreator.run(course)

    return {}
  }
}
