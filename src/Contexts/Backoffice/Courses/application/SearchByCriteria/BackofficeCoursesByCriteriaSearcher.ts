import { Filters, Order } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'

import {
  BackofficeCourseRepository,
  BackofficeCoursesByCriteriaSearcher as DomainBackofficeCoursesByCriteriaSearcher,
} from '../../domain'
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'

// Knows - Repository - Aggregate

@UseCase()
export class BackofficeCoursesByCriteriaSearcher {
  private searcher: DomainBackofficeCoursesByCriteriaSearcher
  constructor(private readonly repository: BackofficeCourseRepository) {
    this.searcher = new DomainBackofficeCoursesByCriteriaSearcher(this.repository)
  }

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCoursesResponse> {
    const courses = await this.searcher.run(filters, order, limit, offset)

    // No return an aggregate
    return new BackofficeCoursesResponse(courses)
  }
}
