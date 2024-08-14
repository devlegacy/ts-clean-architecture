import {
  UseCase,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  ExistUserByUserName, User, UserAlreadyExistsError, UserRepository, UserUsername,
} from '../domain/index.js'
import type {
  UserCreatorRequest,
} from './UserCreatorRequest.js'

/** UserCreatorUseCase */
@UseCase()
export class UserCreator {
  private readonly finder: ExistUserByUserName

  constructor(private readonly repository: UserRepository) {
    this.finder = new ExistUserByUserName(repository)
  }

  async run(request: UserCreatorRequest) {
    const exists = await this.finder.run(new UserUsername(request.username))
    if (exists) throw new UserAlreadyExistsError()

    const user: User = User.create(request)
    await this.repository.save(user)
  }
}
