import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourse, type BackofficeCourseEntityType, BackofficeCourseRepository } from '../../domain/index.js'
import { BackofficeCourseResponse } from '../BackofficeCourseResponse.js'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria/index.js'

@UseCase()
export class BackofficeCourseUpdater {
  constructor(
    private readonly repository: BackofficeCourseRepository,
    private readonly bus: QueryBus,
  ) {}

  async run(params: BackofficeCourseEntityType): Promise<void> {
    await this.ensureCourseExists(params.id)

    const course = new BackofficeCourse(
      params.id,
      params.name,
      params.duration,
      params.createdAt,
      params.updatedAt ?? new Date(),
    )

    await this.repository.update(course)
  }

  private async ensureCourseExists(courseId: BackofficeCourse['id']) {
    const filters = Filter.parse([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId.value,
      },
    ])
    const query = new FindBackofficeCourseByCriteriaQuery(filters)

    const { course } = await this.bus.ask<BackofficeCourseResponse>(query)

    return course
  }
}
