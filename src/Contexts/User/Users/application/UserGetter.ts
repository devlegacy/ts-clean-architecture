import { User, UserRepository } from '../domain'

/** UserGetterUseCase */
export class UserGetter {
  constructor(private readonly userRepository: UserRepository) {}

  async run(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAll()
    return users
  }
}
