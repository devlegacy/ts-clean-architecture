import {
  UserId,
} from '../../Shared/domain/index.js'
import {
  type UserPrimitiveType,
} from '../domain/User.js'
import {
  UserRepository,
} from '../domain/UserRepository.js'

export class UserSearcher {
  constructor(private readonly repository: UserRepository) {}

  async search(id: UserPrimitiveType['id']): Promise<Nullable<UserPrimitiveType>> {
    const user = await this.repository.search(new UserId(id))

    return user?.toPrimitives() ?? null
  }
}
