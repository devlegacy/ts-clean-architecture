import {
  container,
} from 'tsyringe'

import {
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
  Command,
  type CommandHandler,
  Query,
  type QueryHandler,
  Response,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  TYPES,
} from '../types.js'

container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateBlockCommandHandler)
  .register<CommandHandler<Command>>(TYPES.CommandHandler, DeleteBlockCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindBlockQueryHandler)
  .register<BlockRepository>(TYPES.MikroOrmPostgresBlockRepository, MikroOrmPostgresBlockRepository)
  .register<BlockRepository>(TYPES.RedisBlockRepository, RedisBlockRepository)
  .register<BlockRepository>(TYPES.BlockRepository, ProxyBlockRepository)
