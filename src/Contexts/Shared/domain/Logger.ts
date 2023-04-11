export interface LogMessageRecord {
  [key: string]: unknown
  message: string
  // context: Record<string, unknown>
}

export type LogMessage = LogMessageRecord | Error | string
export type LogMethod = (message: LogMessage) => void

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug'

export abstract class Logger {
  abstract info: LogMethod
  abstract warn: LogMethod
  abstract debug: LogMethod
  abstract fatal: LogMethod
  abstract error: LogMethod
  abstract trace: LogMethod
  abstract deep?: LogMethod
  abstract child(bindings: Record<string, unknown>): Logger
}
