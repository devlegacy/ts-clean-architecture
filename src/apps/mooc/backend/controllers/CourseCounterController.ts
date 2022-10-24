import { inject } from 'tsyringe'

import { FindCoursesCounterQuery, FindCoursesCounterResponse } from '@/Contexts/Mooc/CoursesCounter/application/Find'
import { QueryBus } from '@/Contexts/Shared/domain'
import { Controller, Get } from '@/Contexts/Shared/infrastructure/common'

import { TYPES } from '../../dependency-injection/types'

@Controller('courses-counter')
export class CoursesCounterController {
  constructor(@inject(TYPES.QueryBus) private queryBus: QueryBus) {}

  @Get()
  async show() {
    const query = new FindCoursesCounterQuery()
    const { total } = await this.queryBus.ask<FindCoursesCounterResponse>(query)
    return { total }
  }
}
