import { AggregateRoot, Uuid } from '@/Contexts/Shared/domain'

import { CourseId } from '../../Shared/domain'
import { CoursesCounterIncrementedDomainEvent } from './CoursesCounterIncrementedDomainEvent'
import { CoursesCounterId } from './value-object/CoursesCounterId'
import { CoursesCounterTotal } from './value-object/CoursesCounterTotal'

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId
  readonly existingCourses: CourseId[]
  private _total: CoursesCounterTotal

  constructor(id: CoursesCounterId, total: CoursesCounterTotal, existingCourses?: CourseId[]) {
    super()
    this.id = id
    this._total = total
    this.existingCourses = existingCourses || []
  }

  public get total(): CoursesCounterTotal {
    return this._total
  }

  static initialize(id: Uuid): CoursesCounter {
    return new CoursesCounter(id, CoursesCounterTotal.initialize())
  }

  static fromPrimitives(data: { id: string; total: number; existingCourses: string[] }): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map((entry) => new CourseId(entry))
    )
  }

  increment(courseId: CourseId) {
    this._total = this.total.increment()
    this.existingCourses.push(courseId)
    this.record(
      new CoursesCounterIncrementedDomainEvent({
        aggregateId: this.id.value,
        total: this.total.value
      })
    )
  }

  hasIncremented(courseId: CourseId): boolean {
    const exists = this.existingCourses.find((entry) => entry.value === courseId.value)
    return exists !== undefined
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingCourses: this.existingCourses.map((courseId) => courseId.value)
    }
  }
}
