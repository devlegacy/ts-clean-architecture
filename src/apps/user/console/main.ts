import 'reflect-metadata'

import {
  faker,
} from '@faker-js/faker'
import {
  MikroORM,
} from '@mikro-orm/core'
import {
  MongoDriver,
} from '@mikro-orm/mongodb'

// import { container } from 'tsyringe'
import {
  error, info,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'
import {
  UserCreator,
  UserDeleter,
  UserEmailUpdater,
  UserSearcherAll,
  UserUpdater,
} from '#@/src/Contexts/User/Users/application/index.js'
import {
  UserAlreadyExistsError,
  type UserPrimitiveType,
  UserRepository,
} from '#@/src/Contexts/User/Users/domain/index.js'

import {
  container,
} from '../modules/index.js'

// import { TYPES } from '../modules/types'

const id = faker.database.mongodbObjectId()

const userRequest: UserPrimitiveType = {
  // age: 28,
  id,
  // name: 'Samuel',
  name: faker.person.fullName(),
  // username: 'jstsamuel'
  username: faker.internet.userName(),
  // birthdate: faker.date.past({ years: 20 }),
  birthdate: faker.date.birthdate({
    mode: 'age',
    min: 10,
    max: 110,
  }),
  email: faker.internet.email({
    provider: 'gmail.com',
  }),
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
  createdAt: new Date(),
  updatedAt: new Date(),
}

const patchUserRequest: Partial<UserPrimitiveType> = {
  // id: '63312922a9f759eabbb1a161',
  id,
  name: `Samuel ${new Date()}`,
  email: faker.internet.email({
    provider: 'gmail.com',
  }),
}

const updateUserRequest: UserPrimitiveType = {
  ...userRequest,
  name: `Samuel ${new Date().toISOString()}`,
  email: faker.internet.email({
    provider: 'gmail.com',
  }),
}

try {
  // const userRepository = new InMemoryUserRepository()
  const repository = container.get(UserRepository)
  const mongoClient = container.get(MikroORM<MongoDriver>)

  const userCreator = new UserCreator(repository)
  const userSearcherAll = new UserSearcherAll(repository)
  const userUpdater = new UserUpdater(repository)
  const userEmailUpdater = new UserEmailUpdater(repository)
  const userDeleter = new UserDeleter(repository)

  await userCreator.run(userRequest)
  info(userRequest)

  try {
    await userCreator.run(userRequest)
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      error(e)
    }
  }

  let users = await userSearcherAll.run()
  info(users)

  await userUpdater.run(
    updateUserRequest,
    // {
    // ...users[users.length - 1].toPrimitives(),
    // ...updateUserRequest,
    // }
  )

  await userEmailUpdater.run(updateUserRequest.email, patchUserRequest.email!)

  users = await userSearcherAll.run()
  info(users)

  await userDeleter.run(users[users.length - 1]!.id.value)

  users = await userSearcherAll.run()
  info(users)

  await mongoClient.close()
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(e)
}
// node --trace-warnings --watch --loader ts-paths-esm-loader/transpile-only ./src/
