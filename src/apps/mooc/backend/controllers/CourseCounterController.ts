import { FindCoursesCounterQuery, FindCoursesCounterResponse } from '@/Contexts/Mooc/CoursesCounter/application'
import { Controller, Get, QueryBus } from '@/Contexts/Shared/domain'

@Controller('courses-counter')
export class CoursesCounterController {
  constructor(
    // private readonly coursesCounterFinder: CoursesCounterFinder,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  async show() {
    const query = new FindCoursesCounterQuery()
    const { total } = await this.queryBus.ask<FindCoursesCounterResponse>(query)
    return { total }
  }
}
