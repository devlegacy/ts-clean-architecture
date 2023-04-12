import { IQueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { CoursesFinder } from './CoursesFinder'
import { CoursesResponse } from './CoursesResponse'
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery'

@QueryHandler(SearchAllCoursesQuery)
export class SearchAllCoursesQueryHandler implements IQueryHandler<SearchAllCoursesQuery, CoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  // subscribedTo(): Query {
  //   return SearchAllCoursesQuery
  // }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    return this.coursesFinder.run()
  }
}
