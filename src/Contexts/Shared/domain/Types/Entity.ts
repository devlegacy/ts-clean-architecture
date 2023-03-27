import { Simplify, Writable } from 'type-fest'

import { NonFunctionPropertyNames } from './NonFunctionPropertyNames'

export type Entity<T> = Simplify<Writable<Pick<T, Exclude<NonFunctionPropertyNames<T>, 'domainEvents'>>>>
