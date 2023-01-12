import { StringValueObject } from '../ValueObjects/StringValueObject'

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value)
  }
}
