import { DateTime, InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

import { Generation, GenerationName } from './Generation.js'

export class UserBirthdate extends DateTime {
  constructor(override readonly value: Date) {
    super(value)

    this.#ensureBirthdateIsValid(value)
  }

  toPrimitives(): Date {
    return this.value
  }

  generation(): GenerationName {
    return Generation.from(this.value)
  }

  #ensureBirthdateIsValid(value: Date): void {
    const currentDate = new Date()
    let ageInYears = currentDate.getFullYear() - value.getFullYear()

    if (
      currentDate.getMonth() < value.getMonth() ||
      (currentDate.getMonth() === value.getMonth() && currentDate.getDate() < value.getDate())
    ) {
      ageInYears--
    }

    if (ageInYears < 18 || ageInYears > 110) {
      throw new InvalidArgumentError(`<${value.toString()}> is not a valid birthdate`)
    }
  }
}
