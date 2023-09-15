import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'

import { User, UserRepository } from '../domain/index.js'

/** UserGetterUseCase */
@UseCase()
export class UserSearcherAll {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.userRepository.searchAll()
    return users
  }
}
