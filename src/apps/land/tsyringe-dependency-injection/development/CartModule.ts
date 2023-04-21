import { container } from 'tsyringe'

import {
  AddCartItemCommandHandler,
  CreateCartCommandHandler,
  FindCartQueryHandler,
} from '@/Contexts/Land/Carts/application'
import { CartRepository } from '@/Contexts/Land/Carts/domain'
import { MikroOrmPostgresCartRepository } from '@/Contexts/Land/Carts/infrastructure'
import { Command, ICommandHandler, Query, Response } from '@/Contexts/Shared/domain'

import { TYPES } from '../types'

container
  // Application layer
  // 🚌 EventBus <-> EventSubscribers
  // 🏷 Tags - Application
  // 🚌 CommandBus <-> CommandHandlers
  // 🏷 Tags - Application
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, CreateCartCommandHandler)
  .register<ICommandHandler<Command>>(TYPES.CommandHandler, AddCartItemCommandHandler)
  // 🚌 QueryBus <-> QueryHandlers
  // 🏷 Tags - Application
  .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCartQueryHandler)
  // Domain layer
  // Repositories - Mongo
  .register<CartRepository>(TYPES.CartRepository, MikroOrmPostgresCartRepository)
