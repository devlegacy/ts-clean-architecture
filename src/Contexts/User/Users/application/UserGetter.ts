import { Service } from 'diod'

import { User, UserRepository } from '../domain'

/** UserGetterUseCase */
@Service()
export class UserGetter {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.userRepository.getAll()
    return users
  }
}
