import type {
  TransformContext,
} from '@mikro-orm/core'
import {
  Platform,
  Type,
} from '@mikro-orm/core'
import {
  ObjectId,
  UUID,
} from 'mongodb'

import {
  EnumValueObject,
  ValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

/**
 * Convert ValueObject to primitive and vice versa
 */
export class MikroOrmValueObjectTransformer extends Type<any, any> {
  constructor(
    private readonly ValueObject: Class<ValueObject<any> | EnumValueObject<any>> | Class<any[]>,
    private readonly type: 'string' | 'ObjectId' | 'UUID' | 'number' | (string & NonNullable<unknown>),
  ) {
    super()
  }

  // eslint-disable-next-line complexity
  override convertToDatabaseValue(
    value: ValueObject<any>,
    _platform: Platform,
    _context?: TransformContext,
  ): any {
    if (this.type === 'UUID' && Array.isArray(value)) {
      return value.map((v) => new UUID(v.value as string))
    } else if (this.type === 'UUID') {
      const uuid
        = UUID.isValid(value.toString()) && value instanceof UUID
          ? value
          : new UUID(value.value as string)
      return uuid
    } else if (this.type === 'ObjectId' && Array.isArray(value)) {
      return value.map((v) => new ObjectId(v.value as string))
    } else if (this.type === 'ObjectId') {
      const objectId
        = ObjectId.isValid(value.toString()) && value instanceof ObjectId
          ? value
          : new ObjectId(value.value as string)
      return objectId
      // @ts-expect-error some
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

  // @ts-expect-error TODO: fix
  convertToJSValue(value: any, _platform: Platform) {
    if (this.type === 'ObjectId' && Array.isArray(value)) {
      return value.map((v) => new this.ValueObject(v.toString()))
    } else if (this.type === 'ObjectId') {
      const objectId = new this.ValueObject(value.toString())
      return objectId
      // @ts-expect-error prop is defined
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

  // // @ts-expect-error TODO: fix
  // getColumnType(_prop: EntityProperty, _platform: Platform): string {
  //   return this.type
  // }

  // // toJSON(value: any, platform: Platform):any{}
  // // @ts-expect-error TODO: fix
  // compareAsType(): string {
  //   return this.type
  // }

  // // @ts-expect-error TODO: fix
  // ensureComparable() {
  //   return true
  // }
}
