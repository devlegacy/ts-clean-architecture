import { InvalidArgumentError } from '@/Contexts/Shared/domain/index.js'

export class UserBadEntityError extends InvalidArgumentError {
  constructor() {
    super('User with bad entity')
  }
}
