import { ValueObject } from '../ValueObjects'

export class FilterValue extends ValueObject<string | number> {
  constructor(value: string | number) {
    super(value)
  }
}
