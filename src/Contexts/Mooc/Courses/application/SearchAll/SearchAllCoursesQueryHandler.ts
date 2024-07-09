import {
  CreateCourseCommand,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  QueryHandlerSubscriber,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import type {
  QueryHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CoursesFinder,
} from './CoursesFinder.js'
import {
  CoursesResponse,
} from './CoursesResponse.js'
import {
  SearchAllCoursesQuery,
} from './SearchAllCoursesQuery.js'

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
