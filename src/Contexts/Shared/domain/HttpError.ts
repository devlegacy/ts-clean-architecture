export class HttpError {
  readonly statusCode: number
  readonly error: string
  readonly message: string
  readonly path?: string
  readonly code: string | number
  readonly stack?: string
  readonly errors?: any
  constructor({
    statusCode,
    error,
    message,
    path,
    code,
    stack,
    errors,
  }: {
    statusCode: number
    error: string
    message: string
    path?: string
    code: string | number
    stack?: string
    errors?: any
  }) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
    this.path = path
    this.code = code
    this.stack = stack
    this.errors = errors
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      path: this.path,
      code: this.code,
      stack: this.stack,
      errors: this.errors,
    }
  }
}
