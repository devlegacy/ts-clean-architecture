import {
  UserId,
} from '../../Shared/domain/Users/UserId.js'
import {
  UserDoesNotExistError,
} from './Errors/UserDoesNotExistError.js'
import {
  type User,
} from './User.js'
import {
  UserRepository,
} from './UserRepository.js'

export class UserFinder {
  constructor(private readonly repository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.repository.search(new UserId(id))

    if (user === null) {
      throw new UserDoesNotExistError(id)
    }

    return user
  }
}

// export {
//   UserFinder as DomainUserFinder
// }
