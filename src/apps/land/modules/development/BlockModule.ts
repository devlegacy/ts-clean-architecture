import { container } from 'tsyringe'

import {
  CreateBlockCommandHandler,
  DeleteBlockCommandHandler,
  FindBlockQueryHandler,
} from '@/Contexts/Land/Blocks/application'
import { BlockRepository } from '@/Contexts/Land/Blocks/domain'
import {
  MikroOrmPostgresBlockRepository,
  ProxyBlockRepository,
  RedisBlockRepository,
} from '@/Contexts/Land/Blocks/infrastructure'
import { Command, ICommandHandler, Query, Response } from '@/Contexts/Shared/domain'

import { TYPES } from '../types'

container
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, CreateBlockCommandHandler)
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, DeleteBlockCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindBlockQueryHandler)
  .register<BlockRepository>(TYPES.MikroOrmPostgresBlockRepository, MikroOrmPostgresBlockRepository)
  .register<BlockRepository>(TYPES.RedisBlockRepository, RedisBlockRepository)
  .register<BlockRepository>(TYPES.BlockRepository, ProxyBlockRepository)
