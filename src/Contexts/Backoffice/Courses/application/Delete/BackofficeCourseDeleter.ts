import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/dependency-injection/types'
import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria'

// Casos de uso no inyectan command bus
// Casos de uso pueden inyectar query bus

@injectable()
export class BackofficeCourseDeleter {
  constructor(
    @inject(TYPES.BackofficeCourseRepository) private readonly repository: BackofficeCourseRepository,
    @inject(TYPES.QueryBus) private readonly bus: QueryBus
  ) {}

  async run(courseId: BackofficeCourse['id']): Promise<void> {
    await this.ensureCourseExists(courseId)
    await this.repository.delete(courseId)
  }

  private async ensureCourseExists(courseId: BackofficeCourse['id']) {
    const filters = Filter.parseFilters([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId.value
      }
    ])

    await this.bus.ask(new FindBackofficeCourseByCriteriaQuery(filters))
  }
}
