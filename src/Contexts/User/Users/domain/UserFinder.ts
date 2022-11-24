import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/user/modules/types'

import { User, UserNotFoundException, UserRepository } from '.'

/**
 * Domain service
 * Reuse logic
 */
@injectable()
export class UserFinder {
  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  async run(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) throw new UserNotFoundException()

    return user
  }
}
