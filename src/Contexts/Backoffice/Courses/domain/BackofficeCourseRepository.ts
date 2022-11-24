import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse } from './BackofficeCourse'

export interface BackofficeCourseRepository {
  all(): Promise<BackofficeCourse[]>
  searchBy(criteria: Criteria): Promise<BackofficeCourse[]>
  count(criteria: Criteria): Promise<number>
  paginate(
    criteria: Criteria,
    pagination: OffsetPagination
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination }>
  update(course: BackofficeCourse): Promise<void>
  save(course: BackofficeCourse): Promise<void>
  delete(id: BackofficeCourse['id']): Promise<void>
}
