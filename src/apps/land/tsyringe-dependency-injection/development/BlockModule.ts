import { container } from 'tsyringe'

import {
  CreateBlockCommandHandler,
  DeleteBlockCommandHandler,
  FindBlockQueryHandler,
} from '@/Contexts/Land/Blocks/application/index.js'
import { BlockRepository } from '@/Contexts/Land/Blocks/domain/index.js'
import {
  MikroOrmPostgresBlockRepository,
  ProxyBlockRepository,
  RedisBlockRepository,
} from '@/Contexts/Land/Blocks/infrastructure/index.js'
import { Command, CommandHandler, Query, Response } from '@/Contexts/Shared/domain/index.js'

import { TYPES } from '../types'

container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateBlockCommandHandler)
  .register<CommandHandler<Command>>(TYPES.CommandHandler, DeleteBlockCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindBlockQueryHandler)
  .register<BlockRepository>(TYPES.MikroOrmPostgresBlockRepository, MikroOrmPostgresBlockRepository)
  .register<BlockRepository>(TYPES.RedisBlockRepository, RedisBlockRepository)
  .register<BlockRepository>(TYPES.BlockRepository, ProxyBlockRepository)
