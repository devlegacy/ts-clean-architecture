import { User, UserGetterById, UserRepository } from '../domain'

/** UserUpdaterUseCase */
export class UserUpdater {
  private readonly _userGetterById: UserGetterById

  constructor(private readonly userRepository: UserRepository) {
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run(data: { id: string; username: string; age: number; name: string }): Promise<User> {
    const user = await this._userGetterById.run(data.id)
    const userToUpdate: User = User.fromPrimitives({
      ...user.toPrimitives(),
      ...data
    })

    // Note: Alternative sample code:
    //  {
    //   age: data.age ?? user.age,
    //   name: data.name ?? user.name,
    //   id: data.id,
    //   username: data.username ?? user.username
    // }

    await this.userRepository.update(userToUpdate)
    return user
  }
}
