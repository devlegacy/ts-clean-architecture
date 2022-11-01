import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { CourseRepository } from '../domain'

@injectable()
export class CoursesByCriteriaFinder {
  constructor(@inject(TYPES.CourseRepository) private repository: CourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number) {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.searchBy(criteria)

    return courses
  }
}
