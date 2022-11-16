import { Filters, Operator } from '@/Contexts/Shared/domain'
import { LastExistingEntities } from '@/Contexts/Shared/domain/criteria/LastExistingEntities'

import { BackofficeCourse } from './BackofficeCourse'
import { BackofficeCourseRepository } from './BackofficeCourseRepository'
import { BackofficeCourseNotFoundException } from './exceptions'

/**
 * Domain service - Return a domain element
 * Reuse logic
 */

export class BackofficeCourseFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(courseId: string): Promise<BackofficeCourse> {
    const filters = Filters.fromValues(
      Filters.parseFilters([
        {
          field: 'id',
          operator: Operator.EQUAL,
          value: courseId
        }
      ])
    )
    const criteria = new LastExistingEntities(filters)
    const courses = await this.repository.searchBy(criteria)

    if (!courses.length) throw new BackofficeCourseNotFoundException()

    return courses[0]
  }
}
