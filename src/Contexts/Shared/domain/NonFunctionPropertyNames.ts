export type NonFunctionPropertyNames<Type> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Property in keyof Type]: Type[Property] extends Function ? never : Property
}[keyof Type]
