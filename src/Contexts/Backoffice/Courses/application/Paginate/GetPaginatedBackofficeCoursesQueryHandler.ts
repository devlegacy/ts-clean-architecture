import { Filters, OffsetPaginator, QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { BackofficeCoursesPaginatedResponse } from '../BackofficeCoursesPaginatedResponse'
import { BackofficeCoursesPaginator } from './BackofficeCoursesPaginator'
import { GetPaginatedBackofficeCoursesQuery } from './GetPaginatedBackofficeCoursesQuery'

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
