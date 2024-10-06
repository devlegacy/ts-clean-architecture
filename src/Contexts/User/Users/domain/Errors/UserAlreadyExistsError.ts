import {
  ConflictError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserAlreadyExistsError extends ConflictError {
  override code = 'UserAlreadyExistsError'
  constructor() {
    super('User already exists. Duplicated entry')
  }
}
