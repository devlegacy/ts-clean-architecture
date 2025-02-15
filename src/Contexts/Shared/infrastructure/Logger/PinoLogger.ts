import util from 'node:util'

import pino,
{
  type Level,
  type Logger as PinoLoggerType,
  type LoggerOptions,
} from 'pino'

import {
  Logger,
  type LogMessage,
} from '../../domain/index.js'
import {
  MESSAGE_KEY,
  streams,
} from './helpers.js'

export class PinoLogger implements Logger<PinoLoggerType> {
  #logger: pino.Logger

  get logger() {
    return this.#logger
  }

  constructor(options: LoggerOptions = {
      level: 'info',
    }) {
    this.#logger = pino.pino(
      {
        ...options,
        messageKey: MESSAGE_KEY,
        base: null,
      },
      // streams[0]?.stream,
      // streams[1]?.stream,
      pino.multistream(streams(options.level as Level), {
        // levels: pino.levels.values,
        // dedupe: true,
      }),
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

  deep<T = LogMessage>(message: T) {
    this.#logger.info(
      util.inspect(message, {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    )
  }
}

/**
 * Read more on: https://getpino.io/#/
 */
export let logger = () => new PinoLogger().logger

export const deepLog = (data: any) =>
  logger().info(
    util.inspect(data, {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  )

export const configure = (config: LoggerOptions) => {
  logger = () => new PinoLogger(config).logger
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
