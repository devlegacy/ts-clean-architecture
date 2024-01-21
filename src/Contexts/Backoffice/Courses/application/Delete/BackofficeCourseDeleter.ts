import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { Filter, Operator, QueryBus } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourse, BackofficeCourseRepository } from '../../domain/index.js'
import { FindBackofficeCourseByCriteriaQuery } from '../FinderByCriteria/index.js'

// Casos de uso no inyectan command bus
// Casos de uso pueden inyectar query bus

@UseCase()
export class BackofficeCourseDeleter {
  constructor(
    private readonly repository: BackofficeCourseRepository,
    private readonly bus: QueryBus,
  ) {}

  async run(courseId: BackofficeCourse['id']): Promise<void> {
    await this.ensureCourseExists(courseId)
    await this.repository.delete(courseId)
  }

  private async ensureCourseExists(courseId: BackofficeCourse['id']) {
    const filters = Filter.parse([
      {
        field: 'id',
        operator: Operator.EQUAL,
        value: courseId.value,
      },
    ])

    await this.bus.ask(new FindBackofficeCourseByCriteriaQuery(filters))
  }
}
