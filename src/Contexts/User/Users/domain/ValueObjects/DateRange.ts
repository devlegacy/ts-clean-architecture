import { InvalidArgumentError } from '@/Contexts/Shared/domain'

import { EndDate } from './EndDate'
import { StartDate } from './StartDate'

export type DateRangePrimitiveType = Primitives<DateRange>
export type DateRangeEntityType = Entity<DateRange>

export class DateRange {
  startDate: StartDate
  endDate: EndDate | null

  constructor(startDate: StartDate, endDate: EndDate | null) {
    this.startDate = startDate
    this.endDate = endDate
    this.#ensureDateRangeIsValid(this.startDate, this.endDate)
  }

  static fromPrimitives(data: DateRangePrimitiveType) {
    return new DateRange(new StartDate(data.startDate), data.endDate ? new EndDate(data.endDate) : null)
  }

  toPrimitives() {
    return {
      startDate: this.startDate,
      endDate: this.endDate || null,
    }
  }

  #ensureDateRangeIsValid(startDate: StartDate, endDate: EndDate | null) {
    if (endDate === null) {
      return
    }

    if (startDate > endDate) {
      throw new InvalidArgumentError(
        `<${startDate.toString()}-${endDate.toString()}> is not a valid <${this.constructor.name}>`
      )
    }
  }
}
