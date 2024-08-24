import type {
  IncomingMessage,
} from 'node:http'

export abstract class Monitoring {
  abstract capture<R extends IncomingMessage = IncomingMessage>(err: Error, context?: { req?: R }): void
}
