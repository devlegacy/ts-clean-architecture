import {
  User,
  UserAlreadyExistsError,
  UserDoesNotExistError,
  UserEmail,
  type UserPrimitiveType,
  UserRepository,
} from '../../domain/index.js'

// Orquestación de dominio
export class UserEmailUpdater {
  constructor(private readonly repository: UserRepository) {}

  async run(oldEmail: UserPrimitiveType['email'], newEmail: UserPrimitiveType['email']) {
    // Better search because we are trying to get a user by email (as a first validation)
    const [oldUser, newUser] = await Promise.all([
      this.repository.findByEmail(new UserEmail(oldEmail)),
      this.repository.findByEmail(new UserEmail(newEmail)),
    ])
    if (!oldUser) throw new UserDoesNotExistError(oldEmail)
    if (newUser) throw new UserAlreadyExistsError()

    // First approach
    oldUser.updateEmail(newEmail)
    await this.repository.update(oldUser)

    // Second approach
    const userUpdated = new User(
      oldUser.id.value,
      oldUser.name.value,
      oldUser.username.value,
      newEmail,
      oldUser.birthdate.value,
      oldUser.jobExperiences.toPrimitives(),
      oldUser.age?.value
    )
    await this.repository.update(userUpdated)

    // Third approach similar to Second approach
    const userUpdated2 = User.fromPrimitives({
      ...oldUser.toPrimitives(),
      email: newEmail,
    })
    await this.repository.update(userUpdated2)

    // Fourth approach with doubt, atomic updates
    // const userUpdated3 = oldUser.update('email', newEmail)
    // await this.repository.update(userUpdated3)

    // Real approach just for testing
    await this.repository.save(oldUser)
  }
}
