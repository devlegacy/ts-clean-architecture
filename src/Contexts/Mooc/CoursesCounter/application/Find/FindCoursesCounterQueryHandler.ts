import { injectable } from 'tsyringe'

import { Query, QueryHandler } from '@/Contexts/Shared/domain'

import { CoursesCounterFinder } from './CoursesCounterFinder'
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery'
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse'

@injectable()
export class FindCoursesCounterQueryHandler
  implements QueryHandler<FindCoursesCounterQuery, FindCoursesCounterResponse>
{
  constructor(private readonly finder: CoursesCounterFinder) {}

  subscribedTo(): Query {
    return FindCoursesCounterQuery
  }

  async handle(_query: FindCoursesCounterQuery): Promise<FindCoursesCounterResponse> {
    const counter = await this.finder.run()
    return new FindCoursesCounterResponse(counter)
  }
}
