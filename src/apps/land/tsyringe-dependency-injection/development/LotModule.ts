import { container } from 'tsyringe'

import { CreateLotCommandHandler, FindLotQueryHandler } from '@/Contexts/Land/Lots/application/index.js'
import { LotRepository } from '@/Contexts/Land/Lots/domain/index.js'
import { MikroOrmPostgresLotRepository } from '@/Contexts/Land/Lots/infrastructure/index.js'
import { Command, CommandHandler, Query, Response } from '@/Contexts/Shared/domain/index.js'

import { TYPES } from '../types'

container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateLotCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindLotQueryHandler)
  .register<LotRepository>(TYPES.LotRepository, MikroOrmPostgresLotRepository)
