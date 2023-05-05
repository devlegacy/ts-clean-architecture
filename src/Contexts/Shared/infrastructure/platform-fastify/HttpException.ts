import { HttpError } from './interfaces'

export class HttpException extends Error implements HttpError {
  code!: number
  constructor(message?: string) {
    super(message)
  }
}
