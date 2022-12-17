import { injectable } from 'tsyringe'

import { Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { BackofficeCoursesFinder } from './BackofficeCoursesFinder'
import { SearchAllBackofficeCoursesQuery } from './SearchAllBackofficeCoursesQuery'

@injectable()
export class SearchAllBackofficeCoursesQueryHandler
  implements QueryHandler<SearchAllBackofficeCoursesQuery, BackofficeCoursesResponse>
{
  constructor(private readonly finder: BackofficeCoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllBackofficeCoursesQuery
  }

  async handle(_query: SearchAllBackofficeCoursesQuery): Promise<BackofficeCoursesResponse> {
    const courses = await this.finder.run()
    return new BackofficeCoursesResponse(courses)
  }
}
