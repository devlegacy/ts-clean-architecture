import { Filters } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities'

import { BackofficeCourseNotFoundError, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseResponse } from '../BackofficeCourseResponse'

// Knows - Repository - Aggregate

@UseCase()
export class BackofficeCourseByCriteriaFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters): Promise<BackofficeCourseResponse> {
    const criteria = new LastCreatedEntities(filters)

    const courses = await this.repository.searchBy(criteria)
    if (!courses.length) throw new BackofficeCourseNotFoundError()

    const response = new BackofficeCourseResponse(courses[0])
    // No return an aggregate
    return response
  }
}
