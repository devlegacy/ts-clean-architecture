import { OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCoursePrimitiveDto } from '../../domain'

// This could be different
export type PaginatedBackofficeCourseResponse = BackofficeCoursePrimitiveDto

export class PaginatedBackofficeCoursesResponse {
  readonly data: PaginatedBackofficeCourseResponse[]
  readonly pagination?: Pagination
  constructor(courses: BackofficeCourse[], pagination?: OffsetPagination) {
    this.data = courses.map((course) => course.toPrimitives())
    this.pagination = pagination?.getPageNumbers()
  }
}
