import { UserRepository } from '@/Contexts/User/Users/domain/UserRepository'

import { User } from './User'

/**
 * Domain service
 */
export class ExistUserByUserName {
  constructor(private readonly userRepository: UserRepository) {}

  async run(username: User['username']): Promise<boolean> {
    const user = await this.userRepository.findByUserName(username)

    if (!user) return false

    return true
  }
}
