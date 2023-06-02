import { createWriteStream } from 'fs'
import { resolve } from 'path'
import PinoPretty from 'pino-pretty'
import { cwd } from 'process'

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
    stream: createWriteStream(destination, { flags: 'a+' }),
    //pino.destination({ dest: resolve(cwd(), './logger.log')})
  },
]
