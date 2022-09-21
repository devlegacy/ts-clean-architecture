import HttpStatus from 'http-status'

import { HttpError } from '@/Contexts/Shared/infrastructure/http/http-error'

export class UserNotFoundException extends Error implements HttpError {
  code = HttpStatus.NOT_FOUND
  constructor() {
    super('User not found')
  }
}
