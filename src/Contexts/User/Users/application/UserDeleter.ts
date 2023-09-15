import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { User, UserFinder, UserRepository } from '../domain/index.js'

/** UserDeleterUseCase */
@UseCase()
export class UserDeleter {
  private readonly finder: UserFinder

  constructor(private readonly userRepository: UserRepository) {
    this.finder = new UserFinder(userRepository)
  }

  async run(userId: string): Promise<User> {
    const user = await this.finder.run(userId)
    await this.userRepository.delete(user.id.value)

    return user
  }
}
