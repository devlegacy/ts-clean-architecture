// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FlatEnum<T> = `${(typeof T)[keyof typeof T]}` | keyof typeof T | (string & NonNullable<unknown>)
