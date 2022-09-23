import { User, UserFinder, UserRepository } from '../domain'

/** UserDeleterUseCase */
export class UserDeleter {
  private readonly userFinder: UserFinder

  constructor(private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(userId: string): Promise<User> {
    const userToDelete = await this.userFinder.run(userId)
    await this.userRepository.delete(userToDelete)

    return userToDelete
  }
}
