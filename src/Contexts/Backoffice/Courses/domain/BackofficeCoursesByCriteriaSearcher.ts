import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { BackofficeCourse } from './BackofficeCourse'
import { BackofficeCourseRepository } from './BackofficeCourseRepository'

export class BackofficeCoursesByCriteriaSearcher {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCourse[]> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.searchBy(criteria)

    return courses
  }
}
