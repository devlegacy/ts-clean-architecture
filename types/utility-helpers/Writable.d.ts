type Writable<T, K extends keyof T = keyof T> = import('type-fest').Writable<T, K>

// Note: Export allows to keep an scope and doesn't export any other utility type
