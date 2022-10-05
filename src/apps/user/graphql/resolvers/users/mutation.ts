import { container } from 'tsyringe'

import { Uuid } from '@/Contexts/Shared/domain'
import { UserCreator } from '@/Contexts/User/Users/application'

const userMutations = {
  createUser: async (_: any, args: any) => {
    // const database = await MongoDB.getInstance()
    // const userRepository = new MongoUserRepository(database)
    const userCreator = container.resolve(UserCreator)

    const {
      user: { username, age, name }
    } = args

    const user = {
      id: Uuid.random().toString(),
      username,
      age,
      name
    }

    await userCreator.run(user)

    return user
  }
}

export default userMutations
