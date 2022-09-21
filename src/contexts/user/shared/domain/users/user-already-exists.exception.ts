import HttpStatus from 'http-status'

import { HttpError } from '@/Contexts/Shared/infrastructure/http/http-error'

export class UserAlreadyExistsException extends Error implements HttpError {
  code = HttpStatus.UNPROCESSABLE_ENTITY

  constructor() {
    super('User already exists')
  }
}
