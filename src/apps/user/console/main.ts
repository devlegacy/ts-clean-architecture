import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { MongoClientFactory } from '@/Contexts/Shared/infrastructure'
import { MongoConfigFactory } from '@/Contexts/User/Shared/infrastructure'
import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'
import { UserAlreadyExistsException } from '@/Contexts/User/Users/domain'
import { MongoUserRepository } from '@/Contexts/User/Users/infrastructure'
import { error, info } from '@/shared/logger'

const MongoConfig = MongoConfigFactory.createConfig()
const MongoClient = MongoClientFactory.createClient('user', MongoConfig)

const userDto = {
  age: 28,
  id: faker.database.mongodbObjectId(),
  // name: 'Samuel',
  name: faker.name.fullName(),
  // username: 'jst.samuel'
  username: faker.internet.userName()
}

const updateUserDto = {
  id: '63312922a9f759eabbb1a161',
  name: `Samuel ${new Date()}`
}

const bootstrap = async () => {
  const config = dotenv.config()
  expand(config)

  // const userRepository = new InMemoryUserRepository()

  const userRepository = new MongoUserRepository(MongoClient)
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
  await userDeleter.run(users[users.length - 1].id.value)

  users = await userGetter.run()
  info(users)

  await (await MongoClient).close()
}

bootstrap()
