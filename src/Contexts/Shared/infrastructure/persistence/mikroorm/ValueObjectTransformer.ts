import { ObjectId } from 'mongodb'

import { EnumValueObject, NewableClass, ValueObject } from '@/Contexts/Shared/domain'

export class ValueObjectTransformer {
  constructor(
    private readonly ValueObject: NewableClass<ValueObject<any> | EnumValueObject<any>>,
    private readonly type: string
  ) {}

  convertToDatabaseValue(value: ValueObject<any>) {
    if (this.type === 'ObjectId') {
      return new ObjectId(value.value)
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new ObjectId(v.value))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    }
    return value.value
  }

  convertToJSValue(value: any) {
    if (this.type === 'ObjectId') {
      return new this.ValueObject(value.toString())
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new this.ValueObject(v.toString()))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    }

    return new this.ValueObject(value)
  }

  getColumnType() {
    return this.type
  }

  compareAsType() {
    return this.type
  }
}
