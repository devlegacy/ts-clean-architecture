import { MikroORM } from '@mikro-orm/core'
import type { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { ContainerBuilder } from 'diod'
import { Redis } from 'ioredis'

import config from '@/Contexts/Land/Shared/infrastructure/config/index.js'
import { SentryConfigFactory } from '@/Contexts/Land/Shared/infrastructure/index.js'
import { PostgresConfigFactory } from '@/Contexts/Land/Shared/infrastructure/persistence/postgresql/PostgresConfigFactory.js'
import { RedisConfigFactory } from '@/Contexts/Land/Shared/infrastructure/persistence/redis/RedisConfigFactory.js'
import {
  Command,
  CommandBus,
  type CommandHandler,
  EventBus,
  Logger,
  Monitoring,
  Query,
  QueryBus,
  type QueryHandler,
  Response,
} from '@/Contexts/Shared/domain/index.js'
import {
  CommandHandlers,
  FatalErrorHandler,
  InMemoryAsyncEventBus,
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmPostgresClientFactory,
  QueryHandlers,
  RedisClientFactory,
  SentryMonitoring,
} from '@/Contexts/Shared/infrastructure/index.js'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import { TAGS } from '../tags.js'

const context = 'land'
const postgresConfig = PostgresConfigFactory.createConfig()
const connectionClient = MikroOrmPostgresClientFactory.createClient(context, postgresConfig)
const redisConfig = RedisConfigFactory.createConfig()
const redisClient = RedisClientFactory.createClient(context, redisConfig)

export const SharedModule = (builder: ContainerBuilder) => {
  builder.register<Promise<MikroORM<PostgreSqlDriver>>>(MikroORM<PostgreSqlDriver> as any).useFactory(() => {
    return connectionClient
  })
  builder.register(Redis).useFactory(() => {
    return redisClient
  })
  builder
    .register(CommandBus)
    .useFactory((container) => {
      const commands = (container.findTaggedServiceIdentifiers<CommandHandler<Command>>(TAGS.CommandHandler) ?? []).map(
        (identifier) => container.get(identifier),
      )

      const handler = new CommandHandlers(commands)
      return new InMemoryCommandBus(handler)
    })
    .asSingleton()
  builder
    .register(EventBus)
    .useFactory(() => new InMemoryAsyncEventBus())
    .asSingleton()
  builder
    .register(QueryBus)
    .useFactory((container) => {
      const queries = (
        container.findTaggedServiceIdentifiers<QueryHandler<Query, Response>>(TAGS.QueryHandler) ?? []
      ).map((identifier) => container.get(identifier))

      const handler = new QueryHandlers(queries)
      return new InMemoryQueryBus(handler)
    })
    .asSingleton()
  builder.register(Monitoring).useFactory(() => {
    const monitoring = new SentryMonitoring(SentryConfigFactory.createConfig())

    return monitoring
  })
  builder.register(Logger).useFactory(() => {
    const logger = new PinoLogger({
      name: config.get('app.name'),
      level: config.get('log.level'),
    })

    return logger
  })
  builder.register(FatalErrorHandler).use(FatalErrorHandler)
}
