import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { User, UserFinder, type UserPrimitiveType, UserRepository } from '../domain/index.js'

/** UserUpdaterUseCase */
@UseCase()
export class UserUpdater {
  private readonly finder: UserFinder

  constructor(private readonly repository: UserRepository) {
    this.finder = new UserFinder(repository)
  }

  async run(request: UserPrimitiveType): Promise<void> {
    const user = await this.finder.run(request.id)
    const updatedUser = User.fromPrimitives({
      ...user.toPrimitives(),
      ...request,
    })

    // NOTE: Alternative sample code:
    //  {
    //   age: data.age ?? user.age,
    //   name: data.name ?? user.name,
    //   id: data.id,
    //   username: data.username ?? user.username
    // }

    await this.repository.save(updatedUser)
  }
}
