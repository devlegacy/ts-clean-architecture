import { injectable } from 'tsyringe'

import { Filters, Order, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { BackofficeCoursesByCriteriaSearcher } from './BackofficeCoursesByCriteriaSearcher'
import { SearchBackofficeCoursesByCriteriaQuery } from './SearchBackofficeCoursesByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@injectable()
export class SearchBackofficeCoursesByCriteriaQueryHandler
  implements QueryHandler<SearchBackofficeCoursesByCriteriaQuery, BackofficeCoursesResponse>
{
  constructor(private readonly searcher: BackofficeCoursesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchBackofficeCoursesByCriteriaQuery
  }

  handle(query: SearchBackofficeCoursesByCriteriaQuery): Promise<BackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return this.searcher.run(filters, order, query.limit, query.offset)
  }
}
