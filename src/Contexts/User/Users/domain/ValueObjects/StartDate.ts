import { DateTime, InvalidArgumentError } from '@/Contexts/Shared/domain'

export class StartDate extends DateTime {
  constructor(override readonly value: Date) {
    super(value)

    this.#ensureStartDateIsValid(value)
  }

  #ensureStartDateIsValid(value: Date): void {
    const currentDate = new Date()

    if (value > currentDate) {
      throw new InvalidArgumentError(`<${value.toString()}> is not a valid start date`)
    }
  }
}
