import { injectable } from 'tsyringe'

import { Filters, Order, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { CoursesByCriteriaSearcher } from './CoursesByCriteriaSearcher'
import { SearchCoursesByCriteriaQuery } from './SearchCoursesByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@injectable()
export class SearchCoursesByCriteriaQueryHandler
  implements QueryHandler<SearchCoursesByCriteriaQuery, BackofficeCoursesResponse>
{
  constructor(private readonly searcher: CoursesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchCoursesByCriteriaQuery
  }

  handle(query: SearchCoursesByCriteriaQuery): Promise<BackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return this.searcher.run(filters, order, query.limit, query.offset)
  }
}
