import {
  type EntityProperty,
  Platform,
  Type,
} from '@mikro-orm/core'
import {
  ObjectId,
  UUID,
} from 'mongodb'

import {
  EnumValueObject, ValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export class ValueObjectTransformer extends Type<any, any> {
  constructor(
    private readonly ValueObject: Class<ValueObject<any> | EnumValueObject<any>> | Class<any[]>,
    private readonly type: string,
  ) {
    super()
  }

  // eslint-disable-next-line complexity
  override convertToDatabaseValue(value: ValueObject<any>, _platform: Platform) {
    if (this.type === 'ObjectId') {
      const objectId
        = ObjectId.isValid(value.toString()) && value instanceof ObjectId ? value : new ObjectId(value.value)
      return objectId
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new ObjectId(v.value))
    } else if (this.type === 'UUID') {
      return new UUID(value.value)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    } else if (this.type === '[]' && Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return value.toPrimitives()
      // return []
    }
    const primitive = value.value
    return primitive
  }

  override convertToJSValue(value: any, _platform: Platform) {
    if (this.type === 'ObjectId') {
      const objectId = new this.ValueObject(value.toString())
      return objectId
    } else if (this.type === 'ObjectId[]' && Array.isArray(value)) {
      return value.map((v) => new this.ValueObject(v.toString()))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    } else if (this.prop.name === 'deletedAt' && !value) {
      return undefined
    } else if (this.type === '[]' && Array.isArray(value)) {
      return new this.ValueObject(value as any)
    }

    if (this.type === 'number') {
      value = Number(value)
    }

    const vo = new this.ValueObject(value)
    return vo
  }

  override getColumnType(_prop: EntityProperty, _platform: Platform): string {
    return this.type
  }

  // toJSON(value: any, platform: Platform):any{}

  override compareAsType(): string {
    return this.type
  }

  override ensureComparable() {
    return true
  }
}
