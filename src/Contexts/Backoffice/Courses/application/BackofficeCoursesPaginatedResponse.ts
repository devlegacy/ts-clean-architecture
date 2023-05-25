import { OffsetPaginator, Pagination, Response } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCoursePrimitiveType } from '../domain'

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
