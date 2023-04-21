import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { CourseRepository } from '../domain'

export class CoursesByCriteriaFinder {
  constructor(private repository: CourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number) {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.searchBy(criteria)

    return courses
  }
}
