import {
  ContainerBuilder,
} from 'diod'

import {
  BlockCreator,
  BlockDeleter,
  BlockFinder,
  BlockSearcher,
  CreateBlockCommandHandler,
  DeleteBlockCommandHandler,
  FindBlockQueryHandler,
} from '#@/src/Contexts/Land/Blocks/application/index.js'
import {
  BlockRepository,
} from '#@/src/Contexts/Land/Blocks/domain/index.js'
import {
  MikroOrmPostgresBlockRepository,
  ProxyBlockRepository,
  RedisBlockRepository,
} from '#@/src/Contexts/Land/Blocks/infrastructure/index.js'

import {
  BlockController,
} from '../../backend/blocks/BlockController.js'
import {
  TAGS,
} from '../tags.js'

export const BlockModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(BlockController).addTag(TAGS.Controller)
  builder.registerAndUse(CreateBlockCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(BlockCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(BlockSearcher).addTag(TAGS.UseCase)
  builder.registerAndUse(BlockDeleter).addTag(TAGS.UseCase)
  builder.registerAndUse(BlockFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(DeleteBlockCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(FindBlockQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(MikroOrmPostgresBlockRepository)
  builder.registerAndUse(RedisBlockRepository)
  builder.register(BlockRepository).useFactory((container) => {
    return new ProxyBlockRepository(container.get(MikroOrmPostgresBlockRepository), container.get(RedisBlockRepository))
  })
}
