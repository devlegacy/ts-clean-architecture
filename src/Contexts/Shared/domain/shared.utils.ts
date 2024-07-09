export const isUndefined = (value: unknown) => typeof value === 'undefined'
export const isString = (value: unknown) => typeof value === 'string'
export const isNil = (value: unknown) => isUndefined(value) || value === null
export const isFunction = (value: unknown) => typeof value === 'function' // : value is () => unknown
export const isConstructor = <T = unknown>(value: unknown): value is Class<T> =>
  isFunction(value) && !!value?.name && !!value?.prototype && value?.prototype?.constructor === value
export const normalizePath = (path?: string) =>
  path
    ? path.startsWith('/')
      ? `/${path.replace(/\/+$/, '')}`.replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
export const isProduction = (env?: 'production' | 'development' | 'staging' | 'test') =>
  (env ?? process.env.APP_ENV) === 'production'
