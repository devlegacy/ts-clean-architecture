import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  User, UserFinder, UserRepository,
} from '../domain/index.js'

/** UserDeleterUseCase */
@UseCase()
export class UserDeleter {
  private readonly finder: UserFinder

  constructor(private readonly repository: UserRepository) {
    this.finder = new UserFinder(repository)
  }

  async run(userId: string): Promise<User> {
    const user = await this.finder.run(userId)
    await this.repository.remove(user.id.value)

    return user
  }
}
