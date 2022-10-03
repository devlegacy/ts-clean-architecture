import { Service } from 'diod'

import { User, UserFinder, UserRepository } from '../domain'

/** UserDeleterUseCase */
@Service()
export class UserDeleter {
  private readonly userFinder: UserFinder

  constructor(private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(userId: string): Promise<User> {
    const user = await this.userFinder.run(userId)
    await this.userRepository.delete(user.id.value)

    return user
  }
}
