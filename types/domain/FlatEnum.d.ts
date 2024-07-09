// eslint-disable-next-line unused-imports/no-unused-vars
type FlatEnum<T> = `${(typeof T)[keyof typeof T]}` | keyof typeof T | (string & NonNullable<unknown>)
