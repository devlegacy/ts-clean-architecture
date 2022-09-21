export abstract class NumberValueObject {
  readonly value: number

  constructor(value: number) {
    this.value = value
  }

  equalsTo(number: NumberValueObject): boolean {
    return this.value === number.value
  }

  isBiggerThan(number: NumberValueObject): boolean {
    return this.value > number.value
  }
}
