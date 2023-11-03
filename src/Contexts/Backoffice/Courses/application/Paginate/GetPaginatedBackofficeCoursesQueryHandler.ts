import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common/index.js'
import { Filters, OffsetPaginator, type QueryHandler } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCoursesPaginatedResponse } from '../BackofficeCoursesPaginatedResponse.js'
import { BackofficeCoursesPaginator } from './BackofficeCoursesPaginator.js'
import { GetPaginatedBackofficeCoursesQuery } from './GetPaginatedBackofficeCoursesQuery.js'

@QueryHandlerSubscriber(GetPaginatedBackofficeCoursesQuery)
export class GetPaginatedBackofficeCoursesQueryHandler
  implements QueryHandler<GetPaginatedBackofficeCoursesQuery, BackofficeCoursesPaginatedResponse>
{
  constructor(private readonly paginator: BackofficeCoursesPaginator) {}

  // subscribedTo(): Query {
  //   return PaginateBackofficeCoursesQuery
  // }

  async handle(query: GetPaginatedBackofficeCoursesQuery): Promise<BackofficeCoursesPaginatedResponse> {
    const filters = Filters.fromValues(query.filters)

    const paginate = new OffsetPaginator(query.page, query.limit)
    const { courses, total } = await this.paginator.run(filters, query.limit, paginate.offset)
    paginate.calculatePageNumbersBy(total)

    const response = new BackofficeCoursesPaginatedResponse(courses, paginate)

    return response
  }
}
