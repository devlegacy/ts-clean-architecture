import { ConflictError } from '@/Contexts/Shared/domain/index.js'

export class UserAlreadyExistsError extends ConflictError {
  constructor() {
    super('User already exists. Duplicated entry')
  }
}
