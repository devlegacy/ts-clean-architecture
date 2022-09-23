import { ValueObject } from './ValueObject'

export abstract class NumberValueObject extends ValueObject<number> {
  // readonly value: number

  constructor(value: number) {
    // this.value =
    super(value)
  }

  equalsTo(number: NumberValueObject): boolean {
    return this.value === number.value
  }

  isBiggerThan(number: NumberValueObject): boolean {
    return this.value > number.value
  }
}
