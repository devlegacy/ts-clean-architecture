import { Filters } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain'

type Response = { courses: BackofficeCourse[]; total: number }

@UseCase()
export class BackofficeCoursesPaginator {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, limit?: number, offset?: number): Promise<Response> {
    const criteria = new LastCreatedEntities(filters, limit, offset)

    const [courses, total] = await Promise.all([this.repository.search(criteria), this.repository.count(criteria)])
    const response = {
      courses,
      total,
    }
    return response
  }
}
