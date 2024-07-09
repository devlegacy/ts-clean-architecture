import {
  ValueObject,
} from './ValueObject.js'

export class DateTime extends ValueObject<Date> {
  constructor(value: Date) {
    // let value: Date

    // if (typeof date === 'string') {
    //   value = new Date(date)
    // } else if (date instanceof DateTime) {
    //   value = date.value
    // } else if (date instanceof Date) {
    //   value = date
    // } else if (Number.isInteger(date)) {
    //   value = new Date(date as number)
    // } else {
    //   value = new Date()
    // }

    super(value)
    this.#ensureIsValidDate(value)
  }

  static create(value: Date) {
    return new DateTime(value)
  }

  static now() {
    // return new DateTime(utcToZonedTime(parseISO(new Date().toISOString()), 'UTC'))
    return new DateTime(new Date())
  }

  override toString(): string {
    return this.value.toISOString()
  }

  toISO8601() {
    const [
      date,
    ] = this.value.toISOString().split('T')

    return date
  }

  // https://date-fns.org/v2.30.0/docs/isBefore
  isBefore(vo: DateTime): boolean {
    return this.value.getTime() < vo.value.getTime()
  }

  isAfter(vo: DateTime): boolean {
    return this.value.getTime() > vo.value.getTime()
  }

  // 1970, 00:00:00 UTC
  #ensureIsValidDate(value: Date): void {
    const date = new Date(value)
    // Avoid invalid date === Date
    if (isNaN(date.getTime())) {
      throw new Error(`<${value}> is not a valid date`)
    }
  }
}
