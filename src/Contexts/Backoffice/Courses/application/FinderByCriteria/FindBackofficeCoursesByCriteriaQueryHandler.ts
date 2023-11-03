import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import { Filters, type QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourseResponse } from '../BackofficeCourseResponse.js'
import { BackofficeCourseByCriteriaFinder } from './BackofficeCourseByCriteriaFinder.js'
import { FindBackofficeCourseByCriteriaQuery } from './FindBackofficeCourseByCriteriaQuery.js'

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
