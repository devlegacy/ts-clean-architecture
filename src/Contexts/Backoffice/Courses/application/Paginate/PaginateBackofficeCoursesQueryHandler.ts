import { Filters, IQueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { BackofficeCoursesPaginator } from './BackofficeCoursesPaginator'
import { PaginateBackofficeCoursesQuery } from './PaginateBackofficeCoursesQuery'
import { PaginatedBackofficeCoursesResponse } from './PaginatedBackofficeCoursesResponse'

@QueryHandler(PaginateBackofficeCoursesQuery)
export class PaginateBackofficeCoursesQueryHandler
  implements IQueryHandler<PaginateBackofficeCoursesQuery, PaginatedBackofficeCoursesResponse>
{
  constructor(private readonly paginator: BackofficeCoursesPaginator) {}

  // subscribedTo(): Query {
  //   return PaginateBackofficeCoursesQuery
  // }

  async handle(query: PaginateBackofficeCoursesQuery): Promise<PaginatedBackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)

    const pagination = await this.paginator.run(filters, query.limit, query.page)

    return pagination
  }
}
