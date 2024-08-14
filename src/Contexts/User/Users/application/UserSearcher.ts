import {
  UserId,
} from '../../Shared/domain/index.js'
import {
  type UserPrimitiveType,
} from '../domain/index.js'
import {
  UserRepository,
} from '../domain/UserRepository.js'

export class UserSearcher {
  constructor(private readonly repository: UserRepository) {}

  async run(userId: string): Promise<UserPrimitiveType> {
    const user = await this.repository.search(new UserId(userId))

    return user?.toPrimitives() ?? null
  }
}
