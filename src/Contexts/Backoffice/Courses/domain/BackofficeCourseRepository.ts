import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse } from './BackofficeCourse'

export interface BackofficeCourseRepository {
  all(): Promise<BackofficeCourse[]>
  searchBy(criteria: Criteria): Promise<BackofficeCourse[]>
  save(course: BackofficeCourse): Promise<void>
  update(course: BackofficeCourse, update: BackofficeCourse): Promise<BackofficeCourse>
  paginate(
    criteria: Criteria,
    pagination: OffsetPagination
  ): Promise<{ elements: BackofficeCourse[]; pagination?: Pagination }>
}
