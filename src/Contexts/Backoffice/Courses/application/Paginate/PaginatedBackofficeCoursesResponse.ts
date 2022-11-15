import { Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCoursePrimitiveDto } from '../../domain'

// This could be different
export type PaginatedBackofficeCourseResponse = BackofficeCoursePrimitiveDto

export class PaginatedBackofficeCoursesResponse {
  readonly response: { elements: PaginatedBackofficeCourseResponse[]; pagination?: Pagination }

  constructor(paginated: { elements: BackofficeCourse[]; pagination?: Pagination }) {
    this.response = {
      elements: paginated.elements.map((course) => course.toPrimitives()),
      pagination: paginated.pagination
    }
  }
}
