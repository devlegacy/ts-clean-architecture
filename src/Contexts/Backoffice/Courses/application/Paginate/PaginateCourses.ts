import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'
import { Filters, OffsetPagination, Order } from '@/Contexts/Shared/domain'
import { LastExistingEntities } from '@/Contexts/Shared/domain/criteria/LastExistingEntities'

import { BackofficeCourseRepository } from '../../domain'
import { PaginatedBackofficeCoursesResponse } from './PaginatedBackofficeCoursesResponse'

@injectable()
export class PaginateCourses {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, page?: number) {
    const paginate = new OffsetPagination(page, limit)
    const criteria = new LastExistingEntities(filters, limit, paginate.offset)

    const courses = await this.repository.paginate(criteria, paginate)

    return new PaginatedBackofficeCoursesResponse(courses)
  }
}
