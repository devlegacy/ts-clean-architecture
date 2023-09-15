import { User, UserRepository } from '@/Contexts/User/Users/domain/index.js'

/**
 * Domain service
 */
// @UseCase()
export class ExistUserByUserName {
  constructor(private readonly repository: UserRepository) {}

  async run(username: User['username']): Promise<boolean> {
    const user = await this.repository.findByUsername(username)

    if (!user) return false

    return true
  }
}
