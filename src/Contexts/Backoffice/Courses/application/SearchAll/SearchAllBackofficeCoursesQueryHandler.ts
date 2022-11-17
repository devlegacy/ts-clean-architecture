import { injectable } from 'tsyringe'

import { Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { BackofficeCoursesFinder } from './BackofficeCoursesFinder'
import { SearchAllBackofficeCoursesQuery } from './SearchAllBackofficeCoursesQuery'

@injectable()
export class SearchAllBackofficeCoursesQueryHandler
  implements QueryHandler<SearchAllBackofficeCoursesQuery, BackofficeCoursesResponse>
{
  constructor(private readonly coursesFinder: BackofficeCoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllBackofficeCoursesQuery
  }

  async handle(_query: SearchAllBackofficeCoursesQuery): Promise<BackofficeCoursesResponse> {
    return new BackofficeCoursesResponse(await this.coursesFinder.run())
  }
}
