import { Service } from 'diod'

import { ExistUserByUserName, User, UserAlreadyExistsException, UserRepository } from '../domain'
import { UserCreatorRequest } from './UserCreatorRequest'

/** UserCreatorUseCase */
@Service()
export class UserCreator {
  private readonly existUserByUserName: ExistUserByUserName

  constructor(private readonly userRepository: UserRepository) {
    this.existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run(request: UserCreatorRequest) {
    const user: User = User.fromPrimitives(request)

    const existUser = await this.existUserByUserName.run(user.username)
    if (existUser) throw new UserAlreadyExistsException()

    return this.userRepository.save(user)
  }
}
