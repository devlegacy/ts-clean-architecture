export const isUndefined = (obj: unknown): obj is undefined => typeof obj === 'undefined'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isNil = (val: unknown): val is null | undefined => isUndefined(val) || val === null
export const isConstructor = (value: unknown) =>
  isFunction(value) && !!value?.name && !!value?.prototype && value?.prototype?.constructor === value
export const isFunction = (value: unknown): value is () => unknown => typeof value === 'function'
export const normalizePath = (path?: string): string =>
  path
    ? path.startsWith('/')
      ? `/${path.replace(/\/+$/, '')}`.replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
