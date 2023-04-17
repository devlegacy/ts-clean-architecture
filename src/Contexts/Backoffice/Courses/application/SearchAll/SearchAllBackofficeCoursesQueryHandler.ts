import { IQueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { BackofficeCoursesFinder } from './BackofficeCoursesFinder'
import { SearchAllBackofficeCoursesQuery } from './SearchAllBackofficeCoursesQuery'

@QueryHandler(SearchAllBackofficeCoursesQuery)
export class SearchAllBackofficeCoursesQueryHandler
  implements IQueryHandler<SearchAllBackofficeCoursesQuery, BackofficeCoursesResponse>
{
  constructor(private readonly finder: BackofficeCoursesFinder) {}

  // subscribedTo(): Query {
  //   return SearchAllBackofficeCoursesQuery
  // }

  async handle(_query: SearchAllBackofficeCoursesQuery): Promise<BackofficeCoursesResponse> {
    const courses = await this.finder.run()
    return new BackofficeCoursesResponse(courses)
  }
}
