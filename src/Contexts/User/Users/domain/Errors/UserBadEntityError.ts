import {
  InvalidArgumentError,
} from '#@/src/Contexts/Shared/domain/index.js'

export class UserBadEntityError extends InvalidArgumentError {
  override code = 'UserBadEntityError'
  constructor() {
    super('User with bad entity')
  }
}
