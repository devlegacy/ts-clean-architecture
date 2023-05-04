export abstract class Monitoring {
  abstract capture(err: Error, context?: { req: any }): void
}
