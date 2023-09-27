import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import type { QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { CoursesCounterFinder } from './CoursesCounterFinder.js'
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery.js'
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse.js'

@QueryHandlerSubscriber(FindCoursesCounterQuery)
export class FindCoursesCounterQueryHandler
  implements QueryHandler<FindCoursesCounterQuery, FindCoursesCounterResponse>
{
  constructor(private readonly finder: CoursesCounterFinder) {}

  async handle(_query: FindCoursesCounterQuery): Promise<FindCoursesCounterResponse> {
    const counter = await this.finder.run()
    const response = new FindCoursesCounterResponse(counter)
    return response
  }
}
