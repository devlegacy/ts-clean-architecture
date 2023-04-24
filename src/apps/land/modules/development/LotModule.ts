import { ContainerBuilder } from 'diod'

import { CreateLotCommandHandler, FindLotQueryHandler, LotCreator, LotFinder } from '@/Contexts/Land/Lots/application'
import { LotRepository } from '@/Contexts/Land/Lots/domain'
import { MikroOrmPostgresLotRepository } from '@/Contexts/Land/Lots/infrastructure'

import { LotController } from '../../backend/lots/LotController'
import { TAGS } from '../tags'

export const LotModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(LotController).addTag(TAGS.Controller)
  builder.registerAndUse(CreateLotCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(LotCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(FindLotQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(LotFinder).addTag(TAGS.UseCase)
  builder.register(LotRepository).use(MikroOrmPostgresLotRepository)
}
