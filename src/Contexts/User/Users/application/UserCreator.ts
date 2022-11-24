import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/user/modules/types'

import { ExistUserByUserName, User, UserAlreadyExistsException, UserRepository } from '../domain'
import { UserCreatorRequest } from './UserCreatorRequest'

/** UserCreatorUseCase */
@injectable()
export class UserCreator {
  private readonly existUserByUserName: ExistUserByUserName

  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {
    this.existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run(request: UserCreatorRequest) {
    const user: User = User.fromPrimitives(request)

    const existUser = await this.existUserByUserName.run(user.username.value)
    if (existUser) throw new UserAlreadyExistsException()

    return this.userRepository.save(user)
  }
}
