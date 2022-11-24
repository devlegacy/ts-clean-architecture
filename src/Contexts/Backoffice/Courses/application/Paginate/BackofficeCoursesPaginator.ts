import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'
import { Filters, OffsetPagination } from '@/Contexts/Shared/domain'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/criteria/LastCreatedEntities'

import { BackofficeCourseRepository } from '../../domain'
import { PaginatedBackofficeCoursesResponse } from './PaginatedBackofficeCoursesResponse'

@injectable()
export class BackofficeCoursesPaginator {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, limit?: number, page?: number): Promise<PaginatedBackofficeCoursesResponse> {
    const paginate = new OffsetPagination(page, limit)
    const criteria = new LastCreatedEntities(filters, limit, paginate.offset)

    const [courses, total] = await Promise.all([this.repository.searchBy(criteria), this.repository.count(criteria)])
    paginate.calculatePageNumbersBy(total)

    return new PaginatedBackofficeCoursesResponse(courses, paginate)
  }
}
