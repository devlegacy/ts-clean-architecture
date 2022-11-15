export const isConstructor = (value: unknown) =>
  typeof value === 'function' && !!value?.name && !!value?.prototype && value?.prototype?.constructor === value

export const normalizePath = (path?: string): string =>
  path
    ? path.startsWith('/')
      ? `/${path.replace(/\/+$/, '')}`.replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
