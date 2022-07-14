export const isConstructor = (value: any) =>
  !!value?.name && typeof value === 'function' && !!value?.prototype && value?.prototype?.constructor === value

export const normalizePath = (path?: string): string =>
  path
    ? path.startsWith('/')
      ? `/${path.replace(/\/+$/, '')}`.replace(/\/+/g, '/')
      : `/${path.replace(/\/+$/, '')}`
    : '/'
