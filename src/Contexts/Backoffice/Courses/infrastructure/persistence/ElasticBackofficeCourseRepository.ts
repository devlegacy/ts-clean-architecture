import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'
import { ElasticRepository } from '@/Contexts/Shared/infrastructure'

import { BackofficeCourse, BackofficeCourseId, BackofficeCourseRepository } from '../../domain'

export class ElasticBackofficeCourseRepository
  extends ElasticRepository<BackofficeCourse>
  implements BackofficeCourseRepository
{
  async all(): Promise<BackofficeCourse[]> {
    return this.searchAllInElastic(BackofficeCourse.fromPrimitives)
  }

  async searchBy(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.searchByCriteria(criteria, BackofficeCourse.fromPrimitives)
  }

  count(_criteria: Criteria): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPagination
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
