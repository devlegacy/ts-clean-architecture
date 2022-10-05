// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class AggregateRoot<Entity = any, Primitives = any> {
  abstract toPrimitives(): Primitives
}
