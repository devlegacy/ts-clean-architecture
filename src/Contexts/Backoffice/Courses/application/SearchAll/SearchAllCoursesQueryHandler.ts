import { injectable } from 'tsyringe'

import { Query, QueryHandler } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'
import { CoursesFinder } from './CoursesFinder'
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery'

@injectable()
export class SearchAllCoursesQueryHandler implements QueryHandler<SearchAllCoursesQuery, BackofficeCoursesResponse> {
  constructor(private readonly coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery
  }

  async handle(_query: SearchAllCoursesQuery): Promise<BackofficeCoursesResponse> {
    return new BackofficeCoursesResponse(await this.coursesFinder.run())
  }
}
