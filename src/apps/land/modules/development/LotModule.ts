import { container } from 'tsyringe'

import { CreateLotCommandHandler, FindLotQueryHandler } from '@/Contexts/Land/Lots/application'
import { LotRepository } from '@/Contexts/Land/Lots/domain'
import { MikroOrmPostgresLotRepository } from '@/Contexts/Land/Lots/infrastructure'
import { Command, CommandHandler, Query, QueryHandler, Response } from '@/Contexts/Shared/domain'

import { TYPES } from '../types'

container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateLotCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindLotQueryHandler)
  .register<LotRepository>(TYPES.LotRepository, MikroOrmPostgresLotRepository)
