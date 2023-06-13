import { User, UserEntityType, UserRepository } from '../../domain'

export class UserRegister {
  constructor(private readonly repository: UserRepository) {}

  async run(request: UserEntityType) {
    const user = new User(
      request.id,
      request.name,
      request.username,
      request.email,
      request.birthdate,
      request.jobExperiences,
      request.age
    )
    // if (user.isMillennial()) {
    // do something
    // }
    await this.repository.save(user)
  }
}
