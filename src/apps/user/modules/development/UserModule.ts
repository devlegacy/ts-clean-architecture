import { ContainerBuilder } from 'diod'

import { UserCreator, UserDeleter, UserSearcherAll, UserUpdater } from '@/Contexts/User/Users/application/index.js'
import { UserFinder, UserRepository } from '@/Contexts/User/Users/domain/index.js'
import { MikroOrmMongoUserRepository } from '@/Contexts/User/Users/infrastructure/index.js'

import { UserController } from '../../backend/controllers/UserController.js'
import { TAGS } from '../tags.js'

export const UserModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(UserController).addTag(TAGS.Controller)
  // builder.registerAndUse(ExistUserByUserName).addTag(TAGS.UseCase)
  builder.registerAndUse(UserFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(UserCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(UserDeleter).addTag(TAGS.UseCase)
  builder.registerAndUse(UserSearcherAll).addTag(TAGS.UseCase)
  builder.registerAndUse(UserUpdater).addTag(TAGS.UseCase)
  builder.register(UserRepository).use(MikroOrmMongoUserRepository)
}
