import {
  QueryHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  QueryHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BackofficeCoursesResponse,
} from '../BackofficeCoursesResponse.js'
import {
  BackofficeCoursesFinder,
} from './BackofficeCoursesFinder.js'
import {
  SearchAllBackofficeCoursesQuery,
} from './SearchAllBackofficeCoursesQuery.js'

@QueryHandlerSubscriber(SearchAllBackofficeCoursesQuery)
export class SearchAllBackofficeCoursesQueryHandler
implements QueryHandler<SearchAllBackofficeCoursesQuery, BackofficeCoursesResponse> {
  constructor(private readonly finder: BackofficeCoursesFinder) {}

  // subscribedTo(): Query {
  //   return SearchAllBackofficeCoursesQuery
  // }

  async handle(_query: SearchAllBackofficeCoursesQuery): Promise<BackofficeCoursesResponse> {
    const courses = await this.finder.run()
    return new BackofficeCoursesResponse(courses)
  }
}
