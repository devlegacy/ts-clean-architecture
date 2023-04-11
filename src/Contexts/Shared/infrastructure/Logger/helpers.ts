import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { LoggerOptions, pino } from 'pino'
import PinoPretty from 'pino-pretty'
import { cwd } from 'process'
import util from 'util'

export const MESSAGE_KEY = 'message'

const stream = PinoPretty({
  colorize: true, // colorizes the log
  destination: 1,
  ignore: 'pid,hostname',
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  messageKey: MESSAGE_KEY,
})

const destination = resolve(cwd(), './logger.log')
export const streams = [
  { stream },
  {
    stream: createWriteStream(destination),
    //pino.destination({ dest: resolve(cwd(), './logger.log')})
  },
]

/**
 * Read more on: https://getpino.io/#/
 */
export let logger = () =>
  pino(
    {
      name: process?.env?.APP_NAME,
      level: process?.env?.LOG_LEVEL || 'info',
      messageKey: MESSAGE_KEY,
      base: null,
    },
    pino.multistream(streams)
  )

export const deepLog = (data: object) =>
  logger().info(
    util.inspect(data, {
      showHidden: false,
      depth: null,
      colors: true,
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
