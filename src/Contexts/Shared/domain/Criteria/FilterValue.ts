import { ValueObject } from '../ValueObjects/index.js'

export class FilterValue extends ValueObject<string | number> {
  constructor(value: string | number) {
    super(value)
  }
}
