import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/Errors/EntityNotFoundError.js'

export class UserDoesNotExistError extends EntityNotFoundError {
  override code = 'UserDoesNotExistError'
  constructor(id: string) {
    super(`The user <${id}> does not exist`)
  }
}
