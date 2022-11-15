import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'
import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { BackofficeCourseRepository } from '../../domain'
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'

// Knows - Repository - Aggregate

@injectable()
export class CoursesByCriteriaSearcher {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCoursesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.searchBy(criteria)

    // Not return an aggregate
    return new BackofficeCoursesResponse(courses)
  }
}
