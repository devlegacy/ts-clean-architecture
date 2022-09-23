import { NonFunctionPropertyNames } from './NonFunctionPropertyNames'

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
