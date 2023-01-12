export interface Logger {
  info(data: unknown): void
  warn(data: unknown): void
  debug(data: unknown): void
  fatal(data: unknown): void
  error(data: unknown): void
  deep(data: unknown): void
}
