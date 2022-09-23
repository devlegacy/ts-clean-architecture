import { UserNotFoundException } from '../../Shared'
import { User, UserRepository } from '.'

/**
 * Domain service
 * Reuse logic
 */
export class UserFinder {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.userRepository.getById(id)

    if (user === null) throw new UserNotFoundException()

    return user
  }
}
