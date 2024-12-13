import type {
  User,
} from '../domain/User.js'
import {
  UserFinder as DomainUserFinder,
} from '../domain/UserFinder.js'
import {
  UserRepository,
} from '../domain/UserRepository.js'

export class UserFinder {
  private readonly finder: DomainUserFinder

  constructor(repository: UserRepository) {
    this.finder = new DomainUserFinder(repository)
  }

  async run(id: string): Promise<User> {
    const user = (await this.finder.run(id))// .toPrimitives()
    return user
  }
}
