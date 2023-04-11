export abstract class Monitoring {
  abstract capture(err: Error, config?: { req: any }): void
}
