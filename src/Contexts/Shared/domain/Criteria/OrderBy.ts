import { StringValueObject } from '../ValueObjects/StringValueObject'

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value)
  }
}
