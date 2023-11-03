import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { Filters, Order } from '@/Contexts/Shared/domain/index.js'

import {
  BackofficeCourse,
  BackofficeCourseRepository,
  BackofficeCoursesByCriteriaSearcher as DomainBackofficeCoursesByCriteriaSearcher,
} from '../../domain/index.js'

// Knows - Repository - Aggregate

@UseCase()
export class BackofficeCoursesByCriteriaSearcher {
  private searcher: DomainBackofficeCoursesByCriteriaSearcher
  constructor(private readonly repository: BackofficeCourseRepository) {
    this.searcher = new DomainBackofficeCoursesByCriteriaSearcher(this.repository)
  }

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCourse[]> {
    const courses = await this.searcher.run(filters, order, limit, offset)

    // No return an aggregate
    return courses
  }
}
