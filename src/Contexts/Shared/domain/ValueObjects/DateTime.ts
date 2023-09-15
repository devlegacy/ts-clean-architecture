import { ValueObject } from './ValueObject.js'

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
  }

  static now() {
    // return new DateTime(utcToZonedTime(parseISO(new Date().toISOString()), 'UTC'))
    return new DateTime(new Date())
  }

  override toString(): string {
    return this.value.toISOString()
  }
  // https://date-fns.org/v2.30.0/docs/isBefore
  isBefore(vo: DateTime): boolean {
    return this.value.getTime() < vo.value.getTime()
  }

  isAfter(vo: DateTime): boolean {
    return this.value.getTime() > vo.value.getTime()
  }
}
