import { Criteria, OffsetPaginator, type Pagination } from '@/Contexts/Shared/domain/index.js'
import { ElasticRepository } from '@/Contexts/Shared/infrastructure/index.js'

import { BackofficeCourse, BackofficeCourseId, BackofficeCourseRepository } from '../../domain/index.js'

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  async all(): Promise<BackofficeCourse[]> {
    return this.searchAllInElastic(BackofficeCourse.fromPrimitives)
  }

  async search(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.matching(criteria, BackofficeCourse.fromPrimitives)
  }

  count(_criteria: Criteria): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPaginator,
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination | undefined }> {
    throw new Error('Method not implemented.')
  }

  async update(_course: BackofficeCourse): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(_id: BackofficeCourseId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(course: BackofficeCourse): Promise<void> {
    return this.persist(course.id.value, course)
  }
}
