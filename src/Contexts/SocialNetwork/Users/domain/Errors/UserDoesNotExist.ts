import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserDoesNotExist extends EntityNotFoundError {
  override type = 'UserDoesNotExist'
  constructor(id: string) {
    super(`The user ${id} does not exist`)
  }
}
