import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { MongoDB } from '@/contexts/shared/infrastructure/persistance/mongo/mongodb'
import { UserAlreadyExistsException } from '@/contexts/user'
import {
  MongoDBUserRepository,
  // InMemoryUserRepository,
  User
} from '@/contexts/user/users'
import { error, info } from '@/shared/logger'

const userDto: User = {
  age: 28,
  id: '1',
  name: 'Samuel',
  username: 'jst.samuel'
}

const updateUserDto = {
  id: '2',
  name: 'Samuel updated'
}

const bootstrap = async () => {
  const config = dotenv.config()
  expand(config)

  // const userRepository = new InMemoryUserRepository()

  const database = await MongoDB.getInstance()
  const userRepository = new MongoDBUserRepository(database)

  const UserCreator = new UserCreator(userRepository)

  await UserCreator.run(userDto)
  info(userDto)

  try {
    await UserCreator.run(userDto)
  } catch (e) {
    if (e instanceof UserAlreadyExistsException) {
      error(e)
    }
  }

  const UserGetter = new UserGetter(userRepository)
  let users = await UserGetter.run()
  info(users)

  const UserUpdater = new UserUpdater(userRepository)
  await UserUpdater.run(updateUserDto)

  users = await UserGetter.run()
  info(users)

  const UserDeleter = new UserDeleter(userRepository)
  await UserDeleter.run(users[users.length - 1].id)

  users = await UserGetter.run()
  info(users)

  await MongoDB?.client?.close()
}

bootstrap()
