import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { Criteria, Filters, Order } from '@/Contexts/Shared/domain'

import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse'

@injectable()
export class CoursesByCriteriaSearcher {
  constructor(@inject(TYPES.CourseRepository) private repository: CourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCoursesResponse> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.searchBy(criteria)

    return new BackofficeCoursesResponse(courses)
  }
}
