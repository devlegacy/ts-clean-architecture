import {
  ConflictError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserAlreadyExistsError extends ConflictError {
  override type = 'UserAlreadyExistsError'
  constructor() {
    super('User already exists. Duplicated entry')
  }
}
