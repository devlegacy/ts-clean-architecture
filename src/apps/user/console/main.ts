import '../dependency-injection'

import { faker } from '@faker-js/faker'
import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { container } from 'tsyringe'

import { error, info } from '@/Contexts/Shared/infrastructure/logger'
import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'
import { UserAlreadyExistsException, UserRepository } from '@/Contexts/User/Users/domain'

import { TYPES } from '../dependency-injection/types'

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
  // const userRepository = new InMemoryUserRepository()

  const userRepository = container.resolve<UserRepository>(TYPES.UserRepository)
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
  await userUpdater.run(updateUserDto as any)

  users = await userGetter.run()
  info(users)

  const userDeleter = new UserDeleter(userRepository)
  await userDeleter.run(users[users.length - 1].id.value)

  users = await userGetter.run()
  info(users)

  const MongoClient = container.resolve<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient)

  await (await MongoClient).close()
}

bootstrap()
