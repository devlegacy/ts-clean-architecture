import { Nullable } from '@/Contexts/Shared/domain'

import { CoursesCounter } from './CoursesCounter'

export interface CoursesCounterRepository {
  search(): Promise<Nullable<CoursesCounter>>
  save(counter: CoursesCounter): Promise<void>
}
