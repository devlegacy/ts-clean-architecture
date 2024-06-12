import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'
import {
  LastCreatedEntities,
} from '#@/src/Contexts/Shared/domain/Criteria/LastCreatedEntities.js'
import {
  Filters,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BackofficeCourse,
  BackofficeCourseRepository,
} from '../../domain/index.js'

type Response = { courses: BackofficeCourse[], total: number }

@UseCase()
export class BackofficeCoursesPaginator {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters, limit?: number, offset?: number): Promise<Response> {
    const criteria = new LastCreatedEntities(
      filters,
      limit,
      offset,
    )

    const [
      courses,
      total,
    ] = await Promise.all([
      this.repository.search(criteria),
      this.repository.count(criteria),
    ])
    const response = {
      courses,
      total,
    }
    return response
  }
}
