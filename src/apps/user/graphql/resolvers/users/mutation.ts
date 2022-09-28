import { MongoDB } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoDB'
import { MongoUserRepository, UserCreator } from '@/Contexts/User'

const userMutations = {
  createUser: async (_: any, args: any) => {
    const database = await MongoDB.getInstance()
    const userRepository = new MongoUserRepository(database)
    const userCreator = new UserCreator(userRepository)

    const {
      user: { username, age, name }
    } = args

    const user = {
      username,
      age,
      name
    }

    return await userCreator.run(user)
  }
}

export default userMutations
