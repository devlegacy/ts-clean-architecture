import util from 'node:util'

// import { type Logger as PinoLoggerType, type LoggerOptions, pino } from 'pino'
import pino from 'pino'

import { Logger, type LogLevel, type LogMessage } from '../../domain/index.js'
import { MESSAGE_KEY, streams } from './helpers.js'

export class PinoLogger implements Logger<pino.Logger> {
  #logger: pino.Logger

  get logger() {
    return this.#logger
  }

  constructor(options: { name?: string; enabled?: boolean; level?: LogLevel } = { level: 'info' }) {
    this.#logger = pino.pino(
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

/**
 * Read more on: https://getpino.io/#/
 */
export let logger = () => new PinoLogger().logger

export const deepLog = (data: object) =>
  logger().info(
    util.inspect(data, {
      showHidden: false,
      depth: null,
      colors: true,
    })
  )

export const configure = (config: pino.LoggerOptions) => {
  logger = () => new PinoLogger(config as any).logger
}

export const info = logger().info.bind(logger())
export const warn = logger().warn.bind(logger())
export const debug = logger().debug.bind(logger())
export const fatal = logger().fatal.bind(logger())
export const error = logger().error.bind(logger())

// console.log(
//   new PinoLogger({
//     name: 'user',
//     level: 'info',
//   })
// )
