import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'
import { Filters } from '@/Contexts/Shared/domain'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities'

import { BackofficeCourseNotFoundException, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseResponse } from '../BackofficeCourseResponse'

// Knows - Repository - Aggregate

@injectable()
export class BackofficeCourseByCriteriaFinder {
  constructor(@inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository) {}

  async run(filters: Filters): Promise<BackofficeCourseResponse> {
    const criteria = new LastCreatedEntities(filters)

    const courses = await this.repository.searchBy(criteria)
    if (!courses.length) throw new BackofficeCourseNotFoundException()

    const response = new BackofficeCourseResponse(courses[0])
    // No return an aggregate
    return response
  }
}
