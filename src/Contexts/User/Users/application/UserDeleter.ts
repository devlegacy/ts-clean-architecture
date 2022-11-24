import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/user/modules/types'

import { User, UserFinder, UserRepository } from '../domain'

/** UserDeleterUseCase */
@injectable()
export class UserDeleter {
  private readonly userFinder: UserFinder

  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {
    this.userFinder = new UserFinder(userRepository)
  }

  async run(userId: string): Promise<User> {
    const user = await this.userFinder.run(userId)
    await this.userRepository.delete(user.id.value)

    return user
  }
}
