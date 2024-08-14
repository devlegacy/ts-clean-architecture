import {
  UserId,
} from '../../Shared/domain/index.js'
import {
  User,
  UserNotFoundError,
} from '../domain/index.js'
import {
  UserRepository,
} from '../domain/UserRepository.js'

export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: string): Promise<User> {
    const user = await this.repository.search(new UserId(userId))

    if (!user) {
      throw new UserNotFoundError(userId)
    }

    return user
  }
}
