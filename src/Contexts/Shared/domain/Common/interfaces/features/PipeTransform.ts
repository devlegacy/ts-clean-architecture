import type {
  Paramtype,
} from './Paramtype.js'

export type Transform<T = any> = (value: T, metadata: ArgumentMetadata) => any

export interface ArgumentMetadata {
  readonly type: Paramtype

  readonly metatype?: Constructor<any> | undefined

  readonly data?: string | undefined
}

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R
}
