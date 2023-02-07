import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'
import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCourseEntityDto, BackofficeCourseRepository } from '../../domain'
import { BackofficeCourseResponse } from '../BackofficeCourseResponse'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria'

@injectable()
export class BackofficeCourseUpdater {
  constructor(
    @inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository,
    @inject(TYPES.QueryBus) private readonly bus: QueryBus
  ) {}

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
