import pino, { Logger as PinoLoggerType } from 'pino'
import util from 'util'

import { Logger, LogLevel, LogMessage } from '../../domain'
import { MESSAGE_KEY, streams } from './helpers'

export class PinoLogger implements Logger<PinoLoggerType> {
  #logger: PinoLoggerType

  get logger() {
    return this.#logger
  }

  constructor(options: { name?: string; enabled?: boolean; level?: LogLevel } = { level: 'info' }) {
    this.#logger = pino(
      {
        ...options,
        messageKey: MESSAGE_KEY,
        base: null,
      },
      pino.multistream(streams)
    )
  }

  child(bindings: Record<string, unknown>): Omit<Logger, 'logger' | 'deep'> {
    const child = this.#logger.child(bindings)
    return child
  }

  trace(message: LogMessage): void {
    this.#logger.trace(message)
  }

  info(message: LogMessage): void {
    this.#logger.info(message)
  }

  warn(message: LogMessage): void {
    this.#logger.warn(message)
  }

  debug(message: LogMessage): void {
    this.#logger.debug(message)
  }

  fatal(message: LogMessage): void {
    this.#logger.fatal(message)
  }

  error(message: LogMessage): void {
    this.#logger.error(message)
  }

  deep(message: LogMessage) {
    this.#logger.info(
      util.inspect(message, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    )
  }
}
