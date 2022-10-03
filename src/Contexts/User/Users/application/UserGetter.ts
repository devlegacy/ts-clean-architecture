import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/user/dependency-injection/types'

import { User, UserRepository } from '../domain'

/** UserGetterUseCase */
@injectable()
export class UserGetter {
  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    const users = await this.userRepository.getAll()
    return users
  }
}
