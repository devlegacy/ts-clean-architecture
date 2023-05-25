import { Criteria, OffsetPaginator, Pagination } from '@/Contexts/Shared/domain'

import { BackofficeCourse } from './BackofficeCourse'

export abstract class BackofficeCourseRepository {
  abstract all(): Promise<BackofficeCourse[]>
  abstract search(criteria: Criteria): Promise<BackofficeCourse[]>
  abstract count(criteria: Criteria): Promise<number>
  abstract paginate(
    criteria: Criteria,
    pagination: OffsetPaginator
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination }>

  abstract update(course: BackofficeCourse): Promise<void>
  abstract save(course: BackofficeCourse): Promise<void>
  abstract delete(id: BackofficeCourse['id']): Promise<void>
}
