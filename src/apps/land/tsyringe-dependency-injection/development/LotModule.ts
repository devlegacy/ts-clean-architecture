import {
  container,
} from 'tsyringe'

import {
  CreateLotCommandHandler,
  FindLotQueryHandler,
} from '#@/src/Contexts/Land/Lots/application/index.js'
import {
  LotRepository,
} from '#@/src/Contexts/Land/Lots/domain/index.js'
import {
  MikroOrmPostgresLotRepository,
} from '#@/src/Contexts/Land/Lots/infrastructure/index.js'
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
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateLotCommandHandler)
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindLotQueryHandler)
  .register<LotRepository>(TYPES.LotRepository, MikroOrmPostgresLotRepository)
