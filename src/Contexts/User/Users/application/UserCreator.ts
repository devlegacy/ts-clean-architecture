import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { ExistUserByUserName, User, UserAlreadyExistsError, UserRepository } from '../domain/index.js'
import type { UserCreatorRequest } from './UserCreatorRequest.js'

/** UserCreatorUseCase */
@UseCase()
export class UserCreator {
  private readonly finder: ExistUserByUserName

  constructor(private readonly repository: UserRepository) {
    this.finder = new ExistUserByUserName(repository)
  }

  async run(request: UserCreatorRequest) {
    const user: User = User.fromPrimitives(request)

    const exists = await this.finder.run(user.username)
    if (exists) throw new UserAlreadyExistsError()

    await this.repository.save(user)
  }
}
