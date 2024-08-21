import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserDoesNotExistError extends EntityNotFoundError {
  override type = 'UserDoesNotExistError'
  constructor(id: string) {
    super(`The user <${id}> does not exist`)
  }
}
