import {
  CoursesCounter,
} from './CoursesCounter.js'

export abstract class CoursesCounterRepository {
  abstract search(): Promise<Nullable<CoursesCounter>>
  abstract save(counter: CoursesCounter): Promise<void>
}
