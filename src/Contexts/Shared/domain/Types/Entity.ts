import { Writable } from 'type-fest'

import { NonFunctionPropertyNames } from './NonFunctionPropertyNames'

export type Entity<T> = Writable<Pick<T, Exclude<NonFunctionPropertyNames<T>, 'domainEvents'>>>
