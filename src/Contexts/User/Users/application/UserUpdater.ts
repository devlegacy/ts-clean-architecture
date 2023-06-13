import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/user/modules/types'

import { User, UserFinder, UserPrimitiveType, UserRepository } from '../domain'

/** UserUpdaterUseCase */
@injectable()
export class UserUpdater {
  private readonly userFinder: UserFinder

  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(data: UserPrimitiveType): Promise<User> {
    const user = await this.userFinder.run(data.id)
    const update = User.fromPrimitives({
      ...user.toPrimitives(),
      ...data,
    })

    // NOTE: Alternative sample code:
    //  {
    //   age: data.age ?? user.age,
    //   name: data.name ?? user.name,
    //   id: data.id,
    //   username: data.username ?? user.username
    // }

    await this.userRepository.update(user, update)
    return user
  }
}
