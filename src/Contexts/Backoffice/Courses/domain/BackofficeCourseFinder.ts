import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { LastCreatedEntities } from '@/Contexts/Shared/domain/Criteria/LastCreatedEntities.js'
import { Filter, Filters, Operator } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourse } from './BackofficeCourse.js'
import { BackofficeCourseRepository } from './BackofficeCourseRepository.js'
import { BackofficeCourseNotFoundError } from './Errors/index.js'

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
            ]),
          )
        : courseId
    const criteria = new LastCreatedEntities(filters)
    const courses = await this.repository.search(criteria)

    if (!courses.length || !courses[0]) throw new BackofficeCourseNotFoundError()

    return courses[0]
  }
}
