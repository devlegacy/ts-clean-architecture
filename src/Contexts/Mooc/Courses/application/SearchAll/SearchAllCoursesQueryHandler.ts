import { IQueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandler } from '@/Contexts/Shared/domain/Common'

import { CreateCourseCommand } from '../../domain'
import { CoursesFinder } from './CoursesFinder'
import { CoursesResponse } from './CoursesResponse'
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery'

@QueryHandler(SearchAllCoursesQuery)
export class SearchAllCoursesQueryHandler implements IQueryHandler<CreateCourseCommand, CoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  // subscribedTo(): Query {
  //   return SearchAllCoursesQuery
  // }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    const response = await this.coursesFinder.run()
    return response
  }
}
