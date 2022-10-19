import { HttpError } from './interfaces'

export class Exception extends Error {
  constructor(message?: string) {
    super(message)
  }
}

export class HttpException extends Error implements HttpError {
  code!: number
  constructor(message?: string) {
    super(message)
  }
}
