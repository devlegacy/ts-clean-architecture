import {
  FindCoursesCounterQuery,
  FindCoursesCounterResponse,
} from '@/Contexts/Mooc/CoursesCounter/application/index.js'
import { Controller, Get } from '@/Contexts/Shared/domain/Common/index.js'
import { QueryBus } from '@/Contexts/Shared/domain/index.js'

@Controller('courses-counter')
export class CoursesCounterController {
  constructor(
    // private readonly coursesCounterFinder: CoursesCounterFinder,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async show() {
    const query = new FindCoursesCounterQuery()
    const response = await this.queryBus.ask<FindCoursesCounterResponse>(query)
    return response
  }
}
