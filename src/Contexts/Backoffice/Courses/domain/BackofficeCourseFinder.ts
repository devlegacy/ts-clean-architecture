import { Filter, Filters, Operator } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities'

import { BackofficeCourse } from './BackofficeCourse'
import { BackofficeCourseRepository } from './BackofficeCourseRepository'
import { BackofficeCourseNotFoundError } from './Errors'

/**
 * Domain service - Return a domain element
 * Reuse logic
 */

@UseCase()
export class BackofficeCourseFinder {
  constructor(private readonly repository: BackofficeCourseRepository) {}

  async run(courseId: string | Filters): Promise<BackofficeCourse> {
    const filters =
      typeof courseId === 'string'
        ? Filters.fromValues(
            Filter.parse([
              {
                field: 'id',
                operator: Operator.EQUAL,
                value: courseId,
              },
            ])
          )
        : courseId
    const criteria = new LastCreatedEntities(filters)
    const courses = await this.repository.searchBy(criteria)

    if (!courses.length) throw new BackofficeCourseNotFoundError()

    return courses[0]
  }
}
