import { ValueObject } from './ValueObject'

export abstract class StringValueObject extends ValueObject<string> {
  // readonly value: string

  constructor(value: string) {
    // this.value = value
    super(value?.trim())
  }

  // toString() {
  //   return this.value
  // }
}
