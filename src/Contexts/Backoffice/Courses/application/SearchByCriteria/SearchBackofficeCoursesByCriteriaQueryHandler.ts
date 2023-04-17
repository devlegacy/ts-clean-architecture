import { Filters, IQueryHandler, Order } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { BackofficeCoursesByCriteriaSearcher } from './BackofficeCoursesByCriteriaSearcher'
import { SearchBackofficeCoursesByCriteriaQuery } from './SearchBackofficeCoursesByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@QueryHandler(SearchBackofficeCoursesByCriteriaQuery)
export class SearchBackofficeCoursesByCriteriaQueryHandler
  implements IQueryHandler<SearchBackofficeCoursesByCriteriaQuery, BackofficeCoursesResponse>
{
  constructor(private readonly searcher: BackofficeCoursesByCriteriaSearcher) {}

  // subscribedTo(): Query {
  //   return SearchBackofficeCoursesByCriteriaQuery
  // }

  handle(query: SearchBackofficeCoursesByCriteriaQuery): Promise<BackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = query.orderBy ? Order.fromValues(query.orderBy, query.orderType) : Order.createdAt(query.orderType)

    return this.searcher.run(filters, order, query.limit, query.offset)
  }
}
