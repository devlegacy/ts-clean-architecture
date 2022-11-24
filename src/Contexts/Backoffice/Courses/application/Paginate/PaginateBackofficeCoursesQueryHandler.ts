import { injectable } from 'tsyringe'

import { Filters, Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesPaginator } from './BackofficeCoursesPaginator'
import { PaginateBackofficeCoursesQuery } from './PaginateBackofficeCoursesQuery'
import { PaginatedBackofficeCoursesResponse } from './PaginatedBackofficeCoursesResponse'

@injectable()
export class PaginateBackofficeCoursesQueryHandler
  implements QueryHandler<PaginateBackofficeCoursesQuery, PaginatedBackofficeCoursesResponse>
{
  constructor(private readonly paginator: BackofficeCoursesPaginator) {}

  subscribedTo(): Query {
    return PaginateBackofficeCoursesQuery
  }

  async handle(query: PaginateBackofficeCoursesQuery): Promise<PaginatedBackofficeCoursesResponse> {
    const filters = Filters.fromValues(query.filters)

    const pagination = await this.paginator.run(filters, query.limit, query.page)

    return pagination
  }
}
