import { QueryHandler } from '@/Contexts/Shared/domain'
import { QueryHandlerSubscriber } from '@/Contexts/Shared/domain/Common'

import { CreateCourseCommand } from '../../domain'
import { CoursesFinder } from './CoursesFinder'
import { CoursesResponse } from './CoursesResponse'
import { SearchAllCoursesQuery } from './SearchAllCoursesQuery'

@QueryHandlerSubscriber(SearchAllCoursesQuery)
export class SearchAllCoursesQueryHandler implements QueryHandler<CreateCourseCommand, CoursesResponse> {
  constructor(private coursesFinder: CoursesFinder) {}

  // subscribedTo(): Query {
  //   return SearchAllCoursesQuery
  // }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    const courses = await this.coursesFinder.run()
    const response = new CoursesResponse(courses)

    return response
  }
}
