import { MikroORM } from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Redis } from 'ioredis'
import { container, Lifecycle } from 'tsyringe'

import config from '@/Contexts/Land/Shared/infrastructure/config/index.js'
import { SentryConfigFactory } from '@/Contexts/Land/Shared/infrastructure/index.js'
import { PostgresConfigFactory } from '@/Contexts/Land/Shared/infrastructure/persistence/postgresql/PostgresConfigFactory'
import { RedisConfigFactory } from '@/Contexts/Land/Shared/infrastructure/persistence/redis/RedisConfigFactory'
import { CommandBus, EventBus, QueryBus } from '@/Contexts/Shared/domain/index.js'
import {
  FatalErrorHandler,
  InMemoryAsyncEventBus,
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmPostgresClientFactory,
  PostgresConfig,
  RedisClientFactory,
  RedisConfig,
  SentryModule,
} from '@/Contexts/Shared/infrastructure/index.js'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import { TYPES } from '../types'

// First data source
// Could be write datasource | Could be read datasourse but this break the rule of one database peer service
const context = 'land'
const postgresConfig = PostgresConfigFactory.createConfig()
const postgresClient = MikroOrmPostgresClientFactory.createClient(context, postgresConfig)
const redisConfig = RedisConfigFactory.createConfig()
const redisClient = RedisClientFactory.createClient(context, redisConfig)

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
  .register<Promise<MikroORM<PostgreSqlDriver>>>(TYPES.MikroOrmPostgresClient, { useValue: postgresClient })
  .register<RedisConfig>(TYPES.RedisConfig, { useValue: redisConfig })
  .register<Redis>(TYPES.RedisClient, { useValue: redisClient })
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
