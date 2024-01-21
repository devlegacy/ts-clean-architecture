import { InvalidArgumentError, isNil } from '@/Contexts/Shared/domain/index.js'

import { EndDate } from './EndDate.js'
import { StartDate } from './StartDate.js'

export type DateRangePrimitiveType = Primitives<DateRange>
export type DateRangeEntityType = Entity<DateRange>

export class DateRange {
  readonly startDate: StartDate
  readonly endDate: EndDate | null

  constructor(startDate: Date, endDate: Date | null) {
    this.startDate = new StartDate(startDate)
    this.endDate = isNil(endDate) ? null : new EndDate(endDate)
    this.#ensureDateRangeIsValid(this.startDate, this.endDate)
  }

  static fromPrimitives(data: DateRangePrimitiveType) {
    return new DateRange(data.startDate, isNil(data.endDate) ? null : data.endDate)
  }

  toPrimitives() {
    return {
      startDate: this.startDate.value,
      endDate: this.endDate?.value || null,
    }
  }

  #ensureDateRangeIsValid(startDate: StartDate, endDate: EndDate | null) {
    if (endDate === null) {
      return
    }

    //
    if (startDate.isAfter(endDate)) {
      throw new InvalidArgumentError(
        `<${startDate.toString()}-${endDate.toString()}> is not a valid <${this.constructor.name}>`,
      )
    }
  }
}
