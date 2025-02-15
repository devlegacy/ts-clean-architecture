import {
  createWriteStream,
} from 'node:fs'
import {
  resolve,
} from 'node:path'
import {
  cwd,
} from 'node:process'

import type {
  Level,
  StreamEntry,
} from 'pino'
import {
  PinoPretty,
} from 'pino-pretty'

export const MESSAGE_KEY = 'message'

const pinoPrettyStream = PinoPretty({
  colorize: true, // colorizes the log
  colorizeObjects: true,
  destination: 1,
  ignore: 'pid,hostname',
  levelFirst: true,
  translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  messageKey: MESSAGE_KEY,
})

const destination = resolve(cwd(), './logger.log')
const logWriteStream = createWriteStream(destination, {
  flags: 'a+',
})

export const streams = (level: Level = 'info'): StreamEntry[] => [
  pinoPrettyStream,
  logWriteStream,
].map((stream) => ({
  stream,
  level,
  // pino.destination({ dest: resolve(cwd(), './logger.log')})
}))
