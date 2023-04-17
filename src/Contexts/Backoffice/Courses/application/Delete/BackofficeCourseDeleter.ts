import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria'

// Casos de uso no inyectan command bus
// Casos de uso pueden inyectar query bus

@UseCase()
export class BackofficeCourseDeleter {
  constructor(private readonly repository: BackofficeCourseRepository, private readonly bus: QueryBus) {}

  async run(courseId: BackofficeCourse['id']): Promise<void> {
    await this.ensureCourseExists(courseId)
    await this.repository.delete(courseId)
  }

  private async ensureCourseExists(courseId: BackofficeCourse['id']) {
    const filters = Filter.parseFilters([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId.value,
      },
    ])

    await this.bus.ask(new FindBackofficeCourseByCriteriaQuery(filters))
  }
}
