import { ContainerBuilder } from 'diod'

import { UserCreator, UserDeleter, UserGetter, UserUpdater } from '@/Contexts/User/Users/application'
import { UserFinder, UserRepository } from '@/Contexts/User/Users/domain'
import { MikroOrmMongoUserRepository } from '@/Contexts/User/Users/infrastructure'

import { UserController } from '../../backend/controllers/UserController'
import { TAGS } from '../tags'

export const UserModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(UserController).addTag(TAGS.Controller)
  // builder.registerAndUse(ExistUserByUserName).addTag(TAGS.UseCase)
  builder.registerAndUse(UserFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(UserCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(UserDeleter).addTag(TAGS.UseCase)
  builder.registerAndUse(UserGetter).addTag(TAGS.UseCase)
  builder.registerAndUse(UserUpdater).addTag(TAGS.UseCase)
  builder.register(UserRepository).use(MikroOrmMongoUserRepository)
}
