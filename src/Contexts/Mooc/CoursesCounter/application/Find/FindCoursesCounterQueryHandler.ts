import { QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { CoursesCounterFinder } from './CoursesCounterFinder'
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery'
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse'

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
