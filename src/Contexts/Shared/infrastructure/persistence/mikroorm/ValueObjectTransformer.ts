import { EntityProperty, Platform } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

import { EnumValueObject, ValueObject } from '@/Contexts/Shared/domain'

export class ValueObjectTransformer {
  constructor(
    private readonly ValueObject: Class<ValueObject<any> | EnumValueObject<any>>,
    private readonly type: string
  ) {}

  convertToDatabaseValue(value: ValueObject<any>, _platform: Platform) {
    if (this.type === 'ObjectId') {
      return new ObjectId(value.value)
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new ObjectId(v.value))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    }
    const primitive = value.value
    return primitive
  }

  convertToJSValue(value: any, _platform: Platform) {
    if (this.type === 'ObjectId') {
      return new this.ValueObject(value.toString())
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new this.ValueObject(v.toString()))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    }

    if (this.type === 'number') {
      value = Number(value)
    }

    const vo = new this.ValueObject(value)
    return vo
  }

  getColumnType(_prop: EntityProperty, _platform: Platform): string {
    return this.type
  }

  // toJSON(value: any, platform: Platform):any{}

  compareAsType(): string {
    return this.type
  }

  ensureComparable() {
    return true
  }
}
