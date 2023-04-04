import pino, { Logger as PinoLoggerType } from 'pino'
import util from 'util'

import { Logger, LogLevel, LogMethod } from '../../domain'
import { streams } from './helpers'

export class PinoLogger implements Logger {
  #logger: PinoLoggerType

  constructor(options: { name?: string; enabled?: boolean; level?: LogLevel } = { level: 'info' }) {
    this.#logger = pino(
      {
        ...options,
        // messageKey: 'message',
        base: null,
      },
      pino.multistream(streams)
    )
  }

  info(message: Parameters<LogMethod>[0]): void {
    this.#logger.info(message)
  }

  warn(message: Parameters<LogMethod>[0]): void {
    this.#logger.warn(message)
  }

  debug(message: Parameters<LogMethod>[0]): void {
    this.#logger.debug(message)
  }

  fatal(message: Parameters<LogMethod>[0]): void {
    this.#logger.fatal(message)
  }

  error(message: Parameters<LogMethod>[0]): void {
    this.#logger.error(message)
  }

  deep(message: Parameters<LogMethod>[0]) {
    this.#logger.info(
      util.inspect(message, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    )
  }
}
