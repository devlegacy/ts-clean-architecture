import { InvalidArgumentException, NumberValueObject } from '@/Contexts/Shared/domain'

const MIN_AGE = 0
const MAX_AGE = 160

export class UserAge extends NumberValueObject {
  constructor(value: number) {
    super(value)

    this.isValidRangeAge(value)
  }

  private isValidRangeAge(value: number) {
    if (value < MIN_AGE || value > MAX_AGE) {
      throw new InvalidArgumentException(`The user age <${value}> has been between ${MIN_AGE} and ${MAX_AGE}`)
    }
  }
}
