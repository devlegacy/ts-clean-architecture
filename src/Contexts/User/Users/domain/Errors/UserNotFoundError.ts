import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserNotFoundError extends EntityNotFoundError {
  override type = 'UserNotFoundError'
  constructor(userId: string) {
    super(`User <${userId}> doesn't exists`)
    // this.name = this.constructor.name
  }
}
