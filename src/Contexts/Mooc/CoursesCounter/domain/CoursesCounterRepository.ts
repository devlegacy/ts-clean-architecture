import { Nullable } from '@/Contexts/Shared/domain'

import { CoursesCounter } from './CoursesCounter'

export abstract class CoursesCounterRepository {
  abstract search(): Promise<Nullable<CoursesCounter>>
  abstract save(counter: CoursesCounter): Promise<void>
}
