export interface Monitoring {
  capture(err: Error, config: { req: any }): void
}
