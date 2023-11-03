import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { Criteria, Filters, Order } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourse } from './BackofficeCourse.js'
import { BackofficeCourseRepository } from './BackofficeCourseRepository.js'

@UseCase()
export class BackofficeCoursesByCriteriaSearcher {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<BackofficeCourse[]> {
    const criteria = new Criteria(filters, order, limit, offset)

    const courses = await this.repository.search(criteria)

    return courses
  }
}
