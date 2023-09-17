import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { UserId } from '../../Shared/domain/index.js'
import { UserNotFoundError } from './Errors/index.js'
import { User, type UserPrimitiveType } from './User.js'
import { UserRepository } from './UserRepository.js'

/**
 * Domain service
 * Reuse logic
 * Finder puede tener excepciones o errores
 */
@UseCase()
export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: UserPrimitiveType['id']): Promise<User> {
    const user = await this.repository.searchById(new UserId(userId))

    if (!user) throw new UserNotFoundError()

    return user
  }
}
