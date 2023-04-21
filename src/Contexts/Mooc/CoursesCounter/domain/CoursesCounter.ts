import { AggregateRoot, ObjectId } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CoursesCounterIncrementedDomainEvent } from './CoursesCounterIncrementedDomainEvent'
import { CoursesCounterId, CoursesCounterTotal } from './ValueObjects'

export type CoursesCounterEntityDto = Entity<CoursesCounter>
export type CoursesCounterPrimitiveDto = Primitives<CoursesCounter>

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId
  readonly existingCourses: CourseId[]
  private _total: CoursesCounterTotal

  get total(): CoursesCounterTotal {
    return this._total
  }

  private set total(total: CoursesCounterTotal) {
    this._total = total
  }

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses?: CourseId[]) {
    super()
    this.id = id
    this.existingCourses = existingCourses || []
    this._total = total
  }

  static initialize(id: ObjectId): CoursesCounter {
    return new CoursesCounter(id, CoursesCounterTotal.initialize())
  }

  static override fromPrimitives(data: CoursesCounterPrimitiveDto): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map((entry) => new CourseId(entry))
    )
  }

  increment(courseId: CourseId) {
    // if (this.hasIncremented(courseId)) return // throw new CourseAlreadyIncremented
    // NOTE: Try to fix values when are returned by database or ORM
    this._total = this.total.increment()
    this.total = this._total

    this.existingCourses.push(courseId)

    const event = new CoursesCounterIncrementedDomainEvent({
      aggregateId: this.id.value,
      total: this._total.value,
    })
    this.record(event)
  }

  hasIncremented(courseId: CourseId): boolean {
    const exists = this.existingCourses.find((entry) => entry.equals(courseId))
    return exists !== undefined
  }

  toPrimitives(): CoursesCounterPrimitiveDto {
    return {
      id: this.id.value,
      total: this.total.value,
      existingCourses: this.existingCourses.map((courseId) => courseId.value),
    }
  }
}
