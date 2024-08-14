import {
  InvalidArgumentError,
  NumberValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

const MIN_AGE = 0
const MAX_AGE = 160

export class UserAge extends NumberValueObject {
  constructor(value: number) {
    super(value)

    this.#ensureAgeIsInRange(value)
  }

  #ensureAgeIsInRange(value: number) {
    if (value < MIN_AGE || value > MAX_AGE) {
      throw new InvalidArgumentError(`The user age <${value}> should be between ${MIN_AGE} and ${MAX_AGE}`)
    }
  }
}
