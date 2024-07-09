import {
  StringValueObject,
} from '../ValueObjects/index.js'

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value)
  }
}
