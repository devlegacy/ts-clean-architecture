import {
  User, UserRepository,
} from '#@/src/Contexts/User/Users/domain/index.js'

/**
 * Domain service
 */
// @UseCase()
export class ExistUserByUserName {
  constructor(private readonly repository: UserRepository) {}

  async run(username: User['username']): Promise<boolean> {
    const user = await this.repository.findByUsername(username)

    return !!user
  }
}
