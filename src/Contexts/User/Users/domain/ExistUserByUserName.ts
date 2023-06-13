import { User, UserRepository } from '@/Contexts/User/Users/domain'

/**
 * Domain service
 */
export class ExistUserByUserName {
  constructor(private readonly userRepository: UserRepository) {}

  async run(username: User['username']): Promise<boolean> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) return false

    return true
  }
}
