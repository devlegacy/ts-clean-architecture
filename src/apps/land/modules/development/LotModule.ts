import { container } from 'tsyringe'

import { CreateLotCommandHandler } from '@/Contexts/Land/Lots/application'
import { LotRepository } from '@/Contexts/Land/Lots/domain'
import { MikroOrmPostgresLotRepository } from '@/Contexts/Land/Lots/infrastructure'
import { Command, CommandHandler } from '@/Contexts/Shared/domain'

import { TYPES } from '../types'

container
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateLotCommandHandler)
  .register<LotRepository>(TYPES.LotRepository, MikroOrmPostgresLotRepository)
