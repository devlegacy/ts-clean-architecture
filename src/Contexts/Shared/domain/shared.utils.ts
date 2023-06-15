export const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined'
export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNil = (value: unknown): value is null | undefined => isUndefined(value) || value === null
export const isConstructor = <T = unknown>(value: unknown): value is Class<T> =>
  isFunction(value) && !!value?.name && !!value?.prototype && value?.prototype?.constructor === value
export const isFunction = (value: unknown): value is () => unknown => typeof value === 'function'
export const normalizePath = (path?: string): string =>
  path
    ? path.startsWith('/')
      ? `/${path.replace(/\/+$/, '')}`.replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
