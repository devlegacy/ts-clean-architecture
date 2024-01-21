import { Criteria, OffsetPaginator, type Pagination } from '@/Contexts/Shared/domain/index.js'

import { BackofficeCourse, BackofficeCourseId, BackofficeCourseRepository } from '../../domain/index.js'

export class InMemoryCacheBackofficeCourseRepository implements BackofficeCourseRepository {
  constructor(readonly repository: BackofficeCourseRepository) {}

  all(): Promise<BackofficeCourse[]> {
    return this.repository.all()
    throw new Error('Method not implemented.')
  }
  search(_criteria: Criteria): Promise<BackofficeCourse[]> {
    throw new Error('Method not implemented.')
  }
  count(_criteria: Criteria): Promise<number> {
    throw new Error('Method not implemented.')
  }
  paginate(
    _criteria: Criteria,
    _pagination: OffsetPaginator,
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination | undefined }> {
    throw new Error('Method not implemented.')
  }
  update(_course: BackofficeCourse): Promise<void> {
    throw new Error('Method not implemented.')
  }
  save(_course: BackofficeCourse): Promise<void> {
    // TODO: Invalidate cache
    throw new Error('Method not implemented.')
  }
  delete(_id: BackofficeCourseId): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
