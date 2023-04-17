import { Filters, OffsetPagination } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities'

import { BackofficeCourseRepository } from '../../domain'
import { PaginatedBackofficeCoursesResponse } from './PaginatedBackofficeCoursesResponse'

@UseCase()
export class BackofficeCoursesPaginator {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, limit?: number, page?: number): Promise<PaginatedBackofficeCoursesResponse> {
    const paginate = new OffsetPagination(page, limit)
    const criteria = new LastCreatedEntities(filters, limit, paginate.offset)

    const [courses, total] = await Promise.all([this.repository.searchBy(criteria), this.repository.count(criteria)])
    paginate.calculatePageNumbersBy(total)

    const response = new PaginatedBackofficeCoursesResponse(courses, paginate)

    return response
  }
}
