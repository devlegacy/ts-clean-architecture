import { User, UserDoesNotExistError, UserRepository } from '../../domain'

export class UserEmailUpdater {
  constructor(private readonly repository: UserRepository) {}

  async run(oldEmail: User['email'], newEmail: User['email']) {
    // Better search because we are trying to get a user by email (as a first validation)
    const user = await this.repository.findByEmail(oldEmail)
    if (!user) throw new UserDoesNotExistError(oldEmail.value)

    user.updateEmail(newEmail)
    await this.repository.save(user)
  }
}
