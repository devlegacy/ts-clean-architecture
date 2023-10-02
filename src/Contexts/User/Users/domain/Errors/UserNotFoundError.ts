import { EntityNotFoundError } from '@/Contexts/Shared/domain/index.js'

export class UserNotFoundError extends EntityNotFoundError {
  constructor() {
    super("User doesn't exists")
  }
}
