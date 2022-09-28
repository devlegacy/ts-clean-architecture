import { User, UserRepository } from '.'
import { UserNotFoundException } from './UserNotFoundException'

/**
 * Domain service
 * Reuse logic
 */
export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new UserNotFoundException()

    return user
  }
}
