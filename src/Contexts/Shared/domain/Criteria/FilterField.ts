import { StringValueObject } from '../ValueObjects/index.js'

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value)
  }
}
