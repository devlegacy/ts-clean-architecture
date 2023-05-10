import { Filters, QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseResponse } from '../BackofficeCourseResponse'
import { BackofficeCourseByCriteriaFinder } from './BackofficeCourseByCriteriaFinder'
import { FindBackofficeCourseByCriteriaQuery } from './FindBackofficeCourseByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@QueryHandlerSubscriber(FindBackofficeCourseByCriteriaQuery)
export class FindBackofficeCourseByCriteriaQueryHandler
  implements QueryHandler<FindBackofficeCourseByCriteriaQuery, BackofficeCourseResponse>
{
  constructor(private readonly finder: BackofficeCourseByCriteriaFinder) {}

  // subscribedTo(): Query {
  //   return FindBackofficeCourseByCriteriaQuery
  // }

  async handle(query: FindBackofficeCourseByCriteriaQuery): Promise<BackofficeCourseResponse> {
    const filters = Filters.fromValues(query.filters)
    const course = await this.finder.run(filters)
    return course
  }
}
