// export abstract class Monitoring {
//   abstract capture<R extends IncomingMessage = IncomingMessage>(err: Error, context?: { req?: R }): void
// }
export abstract class Monitoring {
  abstract capture(err: Error, context?: { req?: any }): void
}
