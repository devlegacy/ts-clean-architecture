import { faker } from '@faker-js/faker'
import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { error, info } from '@/Contexts/Shared/infrastructure'
import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'
import { UserAlreadyExistsException, UserRepository } from '@/Contexts/User/Users/domain'

import { container } from './dependency-injection'

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

  const userRepository = container.get(UserRepository)
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

  const MongoClient = container.get(Promise<MikroORM<MongoDriver>>)

  await (await MongoClient).close()
}

bootstrap()
