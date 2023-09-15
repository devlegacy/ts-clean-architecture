import { faker } from '@faker-js/faker'
import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'

// import { container } from 'tsyringe'
import { error, info } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import {
  UserCreator,
  UserDeleter,
  UserEmailUpdater,
  UserSearcherAll,
  UserUpdater,
} from '@/Contexts/User/Users/application/index.js'
import { UserAlreadyExistsError, type UserPrimitiveType, UserRepository } from '@/Contexts/User/Users/domain/index.js'

import { container } from '../modules/index.js'

// import { TYPES } from '../modules/types'

const id = faker.database.mongodbObjectId()

const userDto: UserPrimitiveType = {
  age: 28,
  id,
  // name: 'Samuel',
  name: faker.person.fullName(),
  // username: 'jst.samuel'
  username: faker.internet.userName(),
  // birthdate: faker.date.past({ years: 20 }),
  birthdate: faker.date.birthdate({
    mode: 'age',
    min: 10,
    max: 110,
  }),
  email: faker.internet.email({ provider: 'gmail.com' }),
  // jobExperiences: [],
  jobExperiences: [
    {
      title: 'Job title',
      company: 'Company',
      dateRange: {
        startDate: new Date('2020-01-01'),
        endDate: new Date('2022-01-01'),
      },
    },
  ],
}

const patchUserDto: Partial<UserPrimitiveType> = {
  // id: '63312922a9f759eabbb1a161',
  id,
  name: `Samuel ${new Date()}`,
  email: faker.internet.email({ provider: 'gmail.com' }),
}

const updateUserDto: UserPrimitiveType = {
  ...userDto,
  name: `Samuel ${new Date().toISOString()}`,
  email: faker.internet.email({ provider: 'gmail.com' }),
}

const bootstrap = async () => {
  // const userRepository = new InMemoryUserRepository()
  const userRepository = container.get(UserRepository)
  const MongoClient = container.get(MikroORM<MongoDriver>) as unknown as Promise<MikroORM<MongoDriver>>
  const mongoClient = await MongoClient

  const userCreator = new UserCreator(userRepository)
  const userSearcherAll = new UserSearcherAll(userRepository)
  const userUpdater = new UserUpdater(userRepository)
  const userEmailUpdater = new UserEmailUpdater(userRepository)
  const userDeleter = new UserDeleter(userRepository)

  await userCreator.run(userDto)
  info(userDto)

  try {
    await userCreator.run(userDto)
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      error(e)
    }
  }

  let users = await userSearcherAll.run()
  info(users)

  await userUpdater.run({
    // ...users[users.length - 1].toPrimitives(),
    ...updateUserDto,
  })

  await userEmailUpdater.run(updateUserDto.email, patchUserDto.email!)

  users = await userSearcherAll.run()
  info(users)

  await userDeleter.run(users[users.length - 1]!.id.value)

  users = await userSearcherAll.run()
  info(users)

  await mongoClient.close()
}

bootstrap()
// node --trace-warnings --watch --loader ts-paths-esm-loader/transpile-only ./src/
