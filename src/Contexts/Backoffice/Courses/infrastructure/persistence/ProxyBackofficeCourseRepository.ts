import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'
import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse, BackofficeCourseId, BackofficeCourseRepository } from '../../domain'

@injectable()
export class ProxyBackofficeCourseRepository implements BackofficeCourseRepository {
  constructor(
    @inject(TYPES.MikroOrmMongoBackofficeCourseRepository)
    private readonly currentRepository: BackofficeCourseRepository,
    @inject(TYPES.ElasticBackofficeCourseRepository) private readonly targetRepository: BackofficeCourseRepository
  ) {}

  async all(): Promise<BackofficeCourse[]> {
    return this.targetRepository.all()
  }

  async searchBy(criteria: Criteria): Promise<BackofficeCourse[]> {
    return this.targetRepository.searchBy(criteria)
  }

  async count(_criteria: Criteria): Promise<number> {
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
    void this.targetRepository.save(course)
    return this.currentRepository.save(course)
  }
}
