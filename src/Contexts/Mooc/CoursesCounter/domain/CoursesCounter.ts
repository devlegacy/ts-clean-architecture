import { AggregateRoot, Entity, ObjectId, Primitives } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CoursesCounterIncrementedDomainEvent } from './CoursesCounterIncrementedDomainEvent'
import { CoursesCounterId } from './value-object/CoursesCounterId'
import { CoursesCounterTotal } from './value-object/CoursesCounterTotal'

export type CoursesCounterEntityDto = Entity<CoursesCounter>
export type CoursesCounterPrimitiveDto = Primitives<CoursesCounter>

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId
  readonly existingCourses: CourseId[]
  private _total: CoursesCounterTotal

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses?: CourseId[]) {
    super()
    this.id = id
    this.existingCourses = existingCourses || []
    this._total = total
  }

  get total(): CoursesCounterTotal {
    return this._total
  }

  private set total(total: CoursesCounterTotal) {
    this._total = total
  }

  static initialize(id: ObjectId): CoursesCounter {
    return new CoursesCounter(id, CoursesCounterTotal.initialize())
  }

  static fromPrimitives(data: CoursesCounterPrimitiveDto): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map((entry) => new CourseId(entry))
    )
  }

  increment(courseId: CourseId) {
    // NOTE: Try to fix values when are returned by database or ORM
    this._total = this.total.increment()
    this.total = this._total

    this.existingCourses.push(courseId)
    this.record(
      new CoursesCounterIncrementedDomainEvent({
        aggregateId: this.id.value,
        total: this._total.value,
      })
    )
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
