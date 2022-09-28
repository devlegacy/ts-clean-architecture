import { User, UserFinder, UserRepository } from '../domain'

/** UserUpdaterUseCase */
export class UserUpdater {
  private readonly userFinder: UserFinder

  constructor(private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(data: { id: string; username?: string; age?: number; name?: string }): Promise<User> {
    const user = await this.userFinder.run(data.id)
    const userUpdated: User = User.fromPrimitives({
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

    await this.userRepository.update(user, userUpdated)
    return user
  }
}
