import {
  ContainerBuilder,
} from 'diod'

import {
  CreateLotCommandHandler,
  FindLotQueryHandler,
  LotCreator,
  LotFinder,
} from '#@/src/Contexts/Land/Lots/application/index.js'
import {
  LotRepository,
} from '#@/src/Contexts/Land/Lots/domain/index.js'
import {
  MikroOrmPostgresLotRepository,
} from '#@/src/Contexts/Land/Lots/infrastructure/index.js'

import {
  LotController,
} from '../../backend/lots/LotController.js'
import {
  TAGS,
} from '../tags.js'

export const LotModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(LotController).addTag(TAGS.Controller)
  builder.registerAndUse(CreateLotCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(LotCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(FindLotQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(LotFinder).addTag(TAGS.UseCase)
  builder.register(LotRepository).use(MikroOrmPostgresLotRepository)
}
