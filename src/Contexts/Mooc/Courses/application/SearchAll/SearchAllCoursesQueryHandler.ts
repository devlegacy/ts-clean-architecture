import { injectable } from 'tsyringe'

import { Query, QueryHandler } from '@/Contexts/Shared/domain'

import { CoursesFinder } from './CoursesFinder'
import { CoursesResponse } from './CoursesResponse'
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery'

@injectable()
export class SearchAllCoursesQueryHandler implements QueryHandler<SearchAllCoursesQuery, CoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery
  }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    return this.coursesFinder.run()
  }
}
