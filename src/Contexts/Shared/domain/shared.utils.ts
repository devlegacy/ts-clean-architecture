export const isUndefined = (obj: unknown): obj is undefined => typeof obj === 'undefined'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNil = (val: unknown): val is null | undefined => isUndefined(val) || val === null
