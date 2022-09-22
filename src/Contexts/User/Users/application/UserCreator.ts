import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

import { UserAlreadyExistsException } from '../../Shared'
import { ExistUserByUserName, User, UserRepository } from '../domain'
import { UserCreatorRequest } from './UserCreatorRequest'

/** UserCreatorUseCase */
export class UserCreator {
  private readonly existUserByUserName: ExistUserByUserName

  constructor(private readonly userRepository: UserRepository) {
    this.existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run(body: UserCreatorRequest): Promise<User> {
    const user: User = User.fromPrimitives({
      id: Uuid.random().toString(),
      age: body.age,
      name: body.name,
      username: body.username
    })

    const existUser: boolean = await this.existUserByUserName.run(user.username.value)
    if (existUser) throw new UserAlreadyExistsException()

    const userCreated: User = await this.userRepository.save(user)

    return userCreated
  }
}
