// import { container } from 'tsyringe'

import {
  container,
} from '#@/src/apps/user/modules/index.js'
import {
  ObjectId,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  UserCreator,
} from '#@/src/Contexts/User/Users/application/index.js'

const userMutations = {
  createUser: async (_: any, args: any) => {
    // const database = await MongoDB.getInstance()
    // const userRepository = new MongoUserRepository(database)
    const userCreator = container.get(UserCreator)

    const {
      user: {
        username, age, name,
      },
    } = args

    const user = {
      id: ObjectId.random().toString(),
      username,
      age,
      name,
    }

    await userCreator.run(user as any)

    return user
  },
}

export default userMutations
