export interface CustomLogger {
  info(obj: unknown): void
  warn(obj: unknown): void
  debug(obj: unknown): void
  fatal(obj: unknown): void
  error(obj: unknown): void
}
