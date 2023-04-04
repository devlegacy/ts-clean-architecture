export interface LogMessage {
  [key: string]: unknown
  message: string
  context: Record<string, unknown>
}

export type LogMethod = (message: LogMessage | string) => void

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug'

export interface Logger {
  info: LogMethod
  warn: LogMethod
  debug: LogMethod
  fatal: LogMethod
  error: LogMethod
  deep: LogMethod
}
