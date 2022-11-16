import { Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCoursePrimitiveDto } from '../../domain'

// This could be different
export type PaginatedBackofficeCourseResponse = BackofficeCoursePrimitiveDto

export class PaginatedBackofficeCoursesResponse {
  readonly elements: PaginatedBackofficeCourseResponse[]
  readonly pagination?: Pagination
  constructor(paginated: { elements: BackofficeCourse[]; pagination?: Pagination }) {
    this.elements = paginated.elements.map((course) => course.toPrimitives())
    this.pagination = paginated.pagination
  }
}
