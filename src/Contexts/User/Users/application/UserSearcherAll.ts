import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { User, UserRepository } from '../domain/index.js'

/** UserGetterUseCase */
@UseCase()
export class UserSearcherAll {
  constructor(private readonly repository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.repository.searchAll()
    return users
  }
}
