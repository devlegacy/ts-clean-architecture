import {
  DateTime,
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Generation,
  GenerationName,
} from './Generation.js'

// Date al menos que existan requerimientos de negocio que indiquen usar un tipo de dato personalizado como YYYY-MM-DD
export class UserBirthdate extends DateTime {
  constructor(override readonly value: Date) {
    super(value)

    this.#ensureBirthdateIsValid()
  }

  toPrimitives(): Date {
    return this.value
  }

  generation(): GenerationName {
    return Generation.from(this.value)
  }

  ageInYears(): number {
    const currentDate = new Date()
    const ageInYears = currentDate.getFullYear() - this.value.getFullYear()
    if (
      currentDate.getMonth() < this.value.getMonth()
      || (currentDate.getMonth() === this.value.getMonth() && currentDate.getDate() < this.value.getDate())
    ) {
      return ageInYears - 1
    }

    return ageInYears
  }

  #ensureBirthdateIsValid(): void {
    const ageInYears = this.ageInYears()

    if (ageInYears < 18 || ageInYears > 110) {
      throw new InvalidArgumentError(`<${this.value.toString()}> is not a valid birthdate`)
    }
  }
}
