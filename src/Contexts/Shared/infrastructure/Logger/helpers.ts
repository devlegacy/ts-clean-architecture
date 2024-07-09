import {
  createWriteStream,
} from 'node:fs'
import {
  resolve,
} from 'node:path'
import {
  cwd,
} from 'node:process'

import {
  default as PinoPretty,
} from 'pino-pretty'

export const MESSAGE_KEY = 'message'

// @ts-expect-error - This is a valid configuration
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
  {
    stream,
  },
  {
    stream: createWriteStream(destination, {
      flags: 'a+',
    }),
    // pino.destination({ dest: resolve(cwd(), './logger.log')})
  },
]
