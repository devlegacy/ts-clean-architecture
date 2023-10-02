import { User, type UserPrimitiveType, UserRepository } from '../../domain/index.js'

type Request = UserPrimitiveType

export class UserRegister {
  constructor(private readonly repository: UserRepository) {}

  async run(request: Request) {
    const user = new User(
      request.id,
      request.name,
      request.username,
      request.email,
      request.birthdate,
      request.jobExperiences
      // request.age
    )
    if (user.isMillennial()) {
      // do something
    }
    await this.repository.save(user)
  }
}
