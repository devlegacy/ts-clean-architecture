import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

import { UserAlreadyExistsException, UserBadEntityException } from '../../shared'
import { User, UserRepository } from '../domain'
import { ExistUserByUserName } from '../services'
import { UserCreatorRequest } from './user.creator.request'

/** UserCreatorUseCase */
export class UserCreator {
  private readonly existUserByUserName: ExistUserByUserName

  constructor(private readonly userRepository: UserRepository) {
    this.existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run(body: UserCreatorRequest): Promise<User> {
    if (!body.username?.length) throw new UserBadEntityException()
    const existUser: boolean = await this.existUserByUserName.run(body.username)
    if (existUser) throw new UserAlreadyExistsException()

    const user: User = {
      id: Uuid.random().toString(),
      age: body.age,
      name: body.name,
      username: body.username
    }

    const userCreated: User = await this.userRepository.save(user)

    return userCreated
  }
}
