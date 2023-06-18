export interface LogMessageRecord {
  [key: string]: unknown
  message: string
  // context: Record<string, unknown>
}

export type LogMessage = LogMessageRecord | Error | string
export type LogMethod = (message: LogMessage) => void

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

export abstract class Logger<T = unknown> {
  abstract info: LogMethod
  abstract warn: LogMethod
  abstract debug: LogMethod
  abstract fatal: LogMethod
  abstract error: LogMethod
  abstract trace: LogMethod
  abstract deep: LogMethod
  abstract get logger(): T
  abstract child(bindings: Record<string, unknown>): Omit<Logger, 'logger' | 'deep'>
}
