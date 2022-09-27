/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewableClass, ValueObject } from '@/Contexts/Shared/domain'

export class ValueObjectTransformer {
  constructor(private readonly ValueObject: NewableClass<ValueObject<any>>, private readonly type: string) {}
  convertToDatabaseValue(value: ValueObject<any>) {
    return value.value
  }

  convertToJSValue(value: any) {
    return new this.ValueObject(value)
  }

  getColumnType() {
    return this.type
  }

  compareAsType() {
    return this.type
  }
}
