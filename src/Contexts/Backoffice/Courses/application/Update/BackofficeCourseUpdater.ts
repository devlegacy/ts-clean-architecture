import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourse, BackofficeCourseEntityDto, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseResponse } from '../BackofficeCourseResponse'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria'

@UseCase()
export class BackofficeCourseUpdater {
  constructor(private readonly repository: BackofficeCourseRepository, private readonly bus: QueryBus) {}

  async run(params: BackofficeCourseEntityDto): Promise<void> {
    await this.ensureCourseExists(params.id)

    const course = new BackofficeCourse(
      params.id,
      params.name,
      params.duration,
      params.createdAt,
      params.updatedAt ?? new Date()
    )

    await this.repository.update(course)
  }

  private async ensureCourseExists(courseId: BackofficeCourse['id']) {
    const filters = Filter.parseFilters([
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
