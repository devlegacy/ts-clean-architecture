import { UserRepository } from '@/Contexts/User/Users/domain'

/**
 * Domain service
 */
export class ExistUserByUserName {
  constructor(private readonly userRepository: UserRepository) {}

  async run(username: string): Promise<boolean> {
    const user = await this.userRepository.findByUserName(username)

    if (!user) return false

    return true
  }
}
