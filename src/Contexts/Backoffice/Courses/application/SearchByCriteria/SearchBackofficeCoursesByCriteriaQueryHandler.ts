import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import { Filters, Order, type QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse.js'
import { BackofficeCoursesByCriteriaSearcher } from './BackofficeCoursesByCriteriaSearcher.js'
import { SearchBackofficeCoursesByCriteriaQuery } from './SearchBackofficeCoursesByCriteriaQuery.js'

// Injectable and Taggable TYPES.QueryHandler
@QueryHandlerSubscriber(SearchBackofficeCoursesByCriteriaQuery)
export class SearchBackofficeCoursesByCriteriaQueryHandler
  implements QueryHandler<SearchBackofficeCoursesByCriteriaQuery, BackofficeCoursesResponse>
{
  constructor(private readonly searcher: BackofficeCoursesByCriteriaSearcher) {}

  // subscribedTo(): Query {
  //   return SearchBackofficeCoursesByCriteriaQuery
  // }

  async handle(query: SearchBackofficeCoursesByCriteriaQuery): Promise<BackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = query.orderBy ? Order.fromValues(query.orderBy, query.orderType) : Order.createdAt(query.orderType)

    const courses = await this.searcher.run(filters, order, query.limit, query.offset)
    const response = new BackofficeCoursesResponse(courses)

    return response
  }
}
