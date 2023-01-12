import { resolve } from 'path'
import pino, { Logger as BasePinoLogger, LoggerOptions } from 'pino'
import pretty from 'pino-pretty'
import { cwd } from 'process'
import util from 'util'

import { Logger } from '../../domain'

const stream = pretty({
  colorize: true, // colorizes the log
  destination: 1,
  ignore: 'pid,hostname',
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT'
})

const streams = [{ stream }, { stream: pino.destination(resolve(cwd(), './Logger.log')) }]

/**
 * Read more on: https://getpino.io/#/
 */
export let logger = () =>
  pino(
    {
      name: process?.env?.APP_NAME,
      level: process?.env?.LOG_LEVEL || 'info'
    },
    pino.multistream(streams)
  )

export const deepLog = (data: object) =>
  logger().info(
    util.inspect(data, {
      showHidden: false,
      depth: null,
      colors: true
    })
  )

export const configure = (config: LoggerOptions) => {
  logger = () => pino(config)
}

export const info = logger().info.bind(logger())
export const warn = logger().warn.bind(logger())
export const debug = logger().debug.bind(logger())
export const fatal = logger().fatal.bind(logger())
export const error = logger().error.bind(logger())

export class PinoLogger implements Logger {
  #logger: BasePinoLogger

  constructor(conf: { name?: string; level?: string } = { level: 'info' }) {
    this.#logger = pino(conf, pino.multistream(streams))
  }

  info(data: unknown): void {
    this.#logger.info(data)
  }

  warn(data: unknown): void {
    this.#logger.warn(data)
  }

  debug(data: unknown): void {
    this.#logger.debug(data)
  }

  fatal(data: unknown): void {
    this.#logger.fatal(data)
  }

  error(data: unknown): void {
    this.#logger.error(data)
  }

  deep(data: unknown) {
    this.#logger.info(
      util.inspect(data, {
        showHidden: false,
        depth: null,
        colors: true
      })
    )
  }
}
