import { injectable } from 'tsyringe'

import { Filters, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCourseResponse } from '../BackofficeCourseResponse'
import { BackofficeCourseByCriteriaFinder } from './BackofficeCourseByCriteriaFinder'
import { FindBackofficeCourseByCriteriaQuery } from './FindBackofficeCourseByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@injectable()
export class FindBackofficeCourseByCriteriaQueryHandler
  implements QueryHandler<FindBackofficeCourseByCriteriaQuery, BackofficeCourseResponse>
{
  constructor(private readonly finder: BackofficeCourseByCriteriaFinder) {}

  subscribedTo(): Query {
    return FindBackofficeCourseByCriteriaQuery
  }

  handle(query: FindBackofficeCourseByCriteriaQuery): Promise<BackofficeCourseResponse> {
    const filters = Filters.fromValues(query.filters)

    return this.finder.run(filters)
  }
}
