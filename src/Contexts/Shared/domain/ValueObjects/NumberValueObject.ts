import { ValueObject } from './ValueObject.js'

export abstract class NumberValueObject extends ValueObject<number> {
  // readonly value: number

  constructor(value: number) {
    // this.value =
    super(value)
  }

  // sum() {}
  // increase() {}

  isBiggerThan(vo: NumberValueObject): boolean {
    return this.value > vo.value
  }
}
