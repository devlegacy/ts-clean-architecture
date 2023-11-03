import { container } from 'tsyringe'

import {
  AddCartItemCommandHandler,
  CreateCartCommandHandler,
  FindCartQueryHandler,
} from '@/Contexts/Land/Carts/application/index.js'
import { CartRepository } from '@/Contexts/Land/Carts/domain/index.js'
import { MikroOrmPostgresCartRepository } from '@/Contexts/Land/Carts/infrastructure/index.js'
import { Command, CommandHandler, Query, Response } from '@/Contexts/Shared/domain/index.js'

import { TYPES } from '../types'

container
  // Application layer
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCartCommandHandler)
  .register<CommandHandler<Command>>(TYPES.CommandHandler, AddCartItemCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCartQueryHandler)
  // Domain layer
  // Repositories - Mongo
  .register<CartRepository>(TYPES.CartRepository, MikroOrmPostgresCartRepository)
