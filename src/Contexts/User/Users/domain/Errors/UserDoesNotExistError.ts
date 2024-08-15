import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserDoesNotExistError extends EntityNotFoundError {
  // override message = `The user ${this.email ?? ''} does not exist`
  override type = 'UserDoesNotExistError'

  constructor(email: string) {
    const message = `The user ${email} does not exist`
    super(message)
  }
}
