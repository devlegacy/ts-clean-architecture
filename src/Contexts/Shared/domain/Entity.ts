import { NonFunctionPropertyNames } from './NonFunctionPropertyNames'

export type Entity<T> = Pick<T, NonFunctionPropertyNames<T>>
