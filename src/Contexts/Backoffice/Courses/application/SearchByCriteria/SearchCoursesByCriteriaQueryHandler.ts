import { injectable } from 'tsyringe'

import { Filters, Order, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { CoursesResponse } from '../CoursesResponse'
import { CoursesByCriteriaSearcher } from './CoursesByCriteriaSearcher'
import { SearchCoursesByCriteriaQuery } from './SearchCoursesByCriteriaQuery'

// Injectable and Tagable TYPES.QueryHandler
@injectable()
export class SearchCoursesByCriteriaQueryHandler
  implements QueryHandler<SearchCoursesByCriteriaQuery, CoursesResponse>
{
  constructor(private searcher: CoursesByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchCoursesByCriteriaQuery
  }

  handle(query: SearchCoursesByCriteriaQuery): Promise<CoursesResponse> {
    const filters = Filters.fromValues(query.filters)
    const order = Order.fromValues(query.orderBy, query.orderType)

    return this.searcher.run(filters, order, query.offset, query.limit)
  }
}
