import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { CoursesResponse } from '../CoursesResponse'

@injectable()
export class CoursesByCriteriaSearcher {
  constructor(@inject(TYPES.CourseRepository) private repository: CourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<CoursesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.findBy(criteria)

    return new CoursesResponse(courses)
  }
}
