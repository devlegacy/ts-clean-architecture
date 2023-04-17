import { Filters, IQueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourseResponse } from '../BackofficeCourseResponse'
import { BackofficeCourseByCriteriaFinder } from './BackofficeCourseByCriteriaFinder'
import { FindBackofficeCourseByCriteriaQuery } from './FindBackofficeCourseByCriteriaQuery'

// Injectable and Taggable TYPES.QueryHandler
@QueryHandler(FindBackofficeCourseByCriteriaQuery)
export class FindBackofficeCourseByCriteriaQueryHandler
  implements IQueryHandler<FindBackofficeCourseByCriteriaQuery, BackofficeCourseResponse>
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
