import { Criteria } from '@/Contexts/Shared/domain'

import { BackofficeCourse } from './BackofficeCourse'

export interface BackofficeCourseRepository {
  all(): Promise<BackofficeCourse[]>
  searchBy(criteria: Criteria): Promise<BackofficeCourse[]>
  save(course: BackofficeCourse): Promise<void>
}
