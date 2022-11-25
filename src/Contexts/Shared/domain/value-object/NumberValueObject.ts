import { ValueObject } from './ValueObject'

export abstract class NumberValueObject extends ValueObject<number> {
  // readonly value: number

  constructor(value: number) {
    // this.value =
    super(value)
  }

  isBiggerThan(vo: NumberValueObject): boolean {
    return this.value > vo.value
  }
}
