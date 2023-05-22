export class HttpError {
  readonly statusCode: number
  readonly error: string
  readonly message: string
  readonly path?: string
  readonly code: string | number
  readonly stack?: string
  constructor({
    statusCode,
    error,
    message,
    path,
    code,
    stack,
  }: {
    statusCode: number
    error: string
    message: string
    path?: string
    code: string | number
    stack?: string
  }) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
    this.path = path
    this.code = code
    this.stack = stack
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      path: this.path,
      code: this.code,
      stack: this.stack,
    }
  }
}
