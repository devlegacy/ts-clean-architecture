type Methods<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? P : never
}[keyof T]

type MethodsAndProperties<T> = { [key in keyof T]: T[key] }

/** Properties of a class */
type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T> | 'domainEvents'>
// Note: Export allows to keep an scope and doesn't export any other utility type
