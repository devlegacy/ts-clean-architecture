import {
  ConflictError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserAlreadyExistsError extends ConflictError {
  constructor() {
    super('User already exists. Duplicated entry')
    this.type = 'UserAlreadyExistsError'
  }
}
