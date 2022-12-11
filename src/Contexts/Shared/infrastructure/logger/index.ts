import { resolve } from 'path'
import pino, { Logger, LoggerOptions } from 'pino'
import pretty from 'pino-pretty'
import { cwd } from 'process'
import util from 'util'

import { CustomLogger } from '../../domain'

const stream = pretty({
  colorize: true, // colorizes the log
  destination: 1,
  ignore: 'pid,hostname',
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT'
})

const streams = [{ stream }, { stream: pino.destination(resolve(cwd(), './logger.log')) }]

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

export const fatalErrorHandler = (err: Error, ..._args: unknown[]) => {
  logger().error(err)
  process.exit(1)
}

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

export class PinoLogger implements CustomLogger {
  #logger: Logger

  constructor(conf: { name?: string; level?: string } = { level: 'info' }) {
    this.#logger = pino(conf, pino.multistream(streams))
  }

  info(obj: unknown): void {
    this.#logger.info(obj)
  }

  warn(obj: unknown): void {
    this.#logger.warn(obj)
  }

  debug(obj: unknown): void {
    this.#logger.debug(obj)
  }

  fatal(obj: unknown): void {
    this.#logger.fatal(obj)
  }

  error(obj: unknown): void {
    this.#logger.error(obj)
  }
}

// logger().info(
//   {
//     x: 'samuel',
//     y: 'Rojas',
//     z: '%s'
//   },
//   'person',
//   'demo'
// )

// logger().info(
//   '%o\n%s',
//   {
//     x: 'samuel',
//     y: 'Rojas',
//     z: '%'
//   },
//   'person',
//   'demo'
// )
