import {
  BackofficeCourseNotFoundError,
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
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
  BackofficeCourseResponse,
} from '../BackofficeCourseResponse.js'

// Knows - Repository - Aggregate

@UseCase()
export class BackofficeCourseByCriteriaFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters): Promise<BackofficeCourseResponse> {
    const criteria = new LastCreatedEntities(filters)

    const courses = await this.repository.search(criteria)
    if (!courses.length || !courses[0]) throw new BackofficeCourseNotFoundError()

    const response = new BackofficeCourseResponse(courses[0])
    // No return an aggregate
    return response
  }
}
