import { UserDoesNotExistError, UserEmail, UserPrimitiveType, UserRepository } from '../../domain'

// Orquestación de dominio
export class UserEmailUpdater {
  constructor(private readonly repository: UserRepository) {}

  async run(oldEmail: UserPrimitiveType['email'], newEmail: UserPrimitiveType['email']) {
    // Better search because we are trying to get a user by email (as a first validation)
    const user = await this.repository.findByEmail(new UserEmail(oldEmail))
    if (!user) throw new UserDoesNotExistError(oldEmail)

    user.updateEmail(newEmail)
    await this.repository.save(user)
  }
}
