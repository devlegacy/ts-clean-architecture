import {
  UserId,
} from '../../Shared/domain/index.js'
import {
  UserDoesNotExist,
} from './Errors/index.js'
import type {
  User,
} from './User.js'
import type {
  UserRepository,
} from './UserRepository.js'

export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async find(id: string): Promise<User> {
    const user = await this.repository.search(new UserId(id))

    if (user === null) {
      throw new UserDoesNotExist(id)
    }

    return user
  }
}
