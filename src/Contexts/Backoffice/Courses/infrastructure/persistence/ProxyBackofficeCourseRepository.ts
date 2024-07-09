import {
  Service,
} from 'diod'

import {
  BackofficeCourse,
  BackofficeCourseId,
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  Criteria,
  OffsetPaginator,
  type Pagination,
} from '#@/src/Contexts/Shared/domain/index.js'

@Service()
export class ProxyBackofficeCourseRepository implements BackofficeCourseRepository {
  constructor(
    private readonly currentRepository: BackofficeCourseRepository,
    private readonly targetRepository: BackofficeCourseRepository,
  ) {}

  async all(): Promise<BackofficeCourse[]> {
    return this.targetRepository.all()
  }

  async search(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.targetRepository.search(criteria)
  }

  async count(_criteria: Criteria): Promise<number> {
    throw new Error('Method not implemented.')
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPaginator,
  ): Promise<{ data: BackofficeCourse[], pagination?: Pagination | undefined }> {
    throw new Error('Method not implemented.')
  }

  async update(_course: BackofficeCourse): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(_id: BackofficeCourseId): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(course: BackofficeCourse): Promise<void> {
    void this.targetRepository.save(course)
    return this.currentRepository.save(course)
  }
}
