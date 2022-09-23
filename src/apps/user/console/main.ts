import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { MongoDB } from '@/Contexts/Shared/infrastructure/persistance/mongo/MongoDB'
import { UserAlreadyExistsException } from '@/Contexts/User'
import { MongoUserRepository, UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users'
import { error, info } from '@/shared/logger'

const userDto = {
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
  const userRepository = new MongoUserRepository(database)

  const userCreator = new UserCreator(userRepository)

  await userCreator.run(userDto)
  info(userDto)

  try {
    await userCreator.run(userDto)
  } catch (e) {
    if (e instanceof UserAlreadyExistsException) {
      error(e)
    }
  }

  const userGetter = new UserGetter(userRepository)
  let users = await userGetter.run()
  info(users)

  const userUpdater = new UserUpdater(userRepository)
  await userUpdater.run(updateUserDto)

  users = await userGetter.run()
  info(users)

  const userDeleter = new UserDeleter(userRepository)
  await userDeleter.run(users[users.length - 1].id)

  users = await userGetter.run()
  info(users)

  await MongoDB?.client?.close()
}

bootstrap()
