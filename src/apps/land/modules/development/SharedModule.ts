import { MikroORM } from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { container, Lifecycle } from 'tsyringe'

import { SentryConfigFactory } from '@/Contexts/Land/Shared/infrastructure'
import config from '@/Contexts/Land/Shared/infrastructure/config'
import { PostgresConfigFactory } from '@/Contexts/Land/Shared/infrastructure/persistence/postgresql/TypeOrmConfigFactory'
import { CommandBus, EventBus, QueryBus } from '@/Contexts/Shared/domain'
import {
  FatalErrorHandler,
  InMemoryAsyncEventBus,
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmPostgresClientFactory,
  PostgresConfig,
  SentryModule,
} from '@/Contexts/Shared/infrastructure'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger'

import { TYPES } from '../types'

// First data source
// Could be write datasource | Could be read datasourse but this break the rule of one database peer service
const context = 'land'
const postgresConfig = PostgresConfigFactory.createConfig()
const mikroOrmPostgres = MikroOrmPostgresClientFactory.createClient(context, postgresConfig)

const monitoring = new SentryModule({ options: SentryConfigFactory.createConfig() })
const logger = new PinoLogger({
  name: config.get('app.name'),
  level: config.get('log.level'),
})

container
  // Infrastructure layer
  // Bootstrap global dependencies
  // Database - PostgresClient
  .register<PostgresConfig>(TYPES.PostgresConfig, { useValue: postgresConfig })
  .register<Promise<MikroORM<PostgreSqlDriver>>>(TYPES.MikroOrmPostgresClient, { useValue: mikroOrmPostgres })
  // EventBus - InMemory - Infrastructure
  .register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })
  // CommandBus - InMemory - Infrastructure
  // DEBT: Don't allow empty commands, needs at least once
  .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus, { lifecycle: Lifecycle.Singleton })
  // QueryBus - InMemory - Infrastructure
  // DEBT: Don't allow empty queries, needs at least once
  .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus, { lifecycle: Lifecycle.Singleton })
  // Monitoring
  .register(TYPES.Monitoring, { useValue: monitoring })
  // Logger
  .register(TYPES.Logger, { useValue: logger })
  .registerSingleton(FatalErrorHandler)
