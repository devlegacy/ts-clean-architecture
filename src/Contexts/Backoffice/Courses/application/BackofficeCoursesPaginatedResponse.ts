import {
  BackofficeCourse,
  type BackofficeCoursePrimitiveType,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  OffsetPaginator,
  type Pagination,
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

// This could be different
type ResponseType = {
  data: BackofficeCoursePrimitiveType[]
}

export class BackofficeCoursesPaginatedResponse extends Response {
  readonly data: ResponseType['data']
  readonly pagination?: Pagination

  constructor(courses: BackofficeCourse[], pagination?: OffsetPaginator) {
    super()
    this.data = courses.map((course) => course.toPrimitives())
    this.pagination = pagination?.getPageNumbers()
  }
}
