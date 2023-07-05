import { resolve } from 'node:path'

import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { ContainerBuilder } from 'diod'

import {
  LoggerConfigFactory,
  MongoConfigFactory,
  RabbitMQConfigFactory,
  RabbitMQEventBusFactory,
  SentryConfigFactory,
} from '@/Contexts/Mooc/Shared/infrastructure'
import {
  Command,
  CommandBus,
  CommandHandler,
  EventBus,
  Logger,
  Monitoring,
  Query,
  QueryBus,
  QueryHandler,
  Response,
} from '@/Contexts/Shared/domain'
import {
  CommandHandlers,
  FatalErrorHandler,
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmMongoClientFactory,
  MikroOrmMongoDomainEventFailoverPublisher,
  QueryHandlers,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
  SentryModule,
} from '@/Contexts/Shared/infrastructure'
import { PinoLogger } from '@/Contexts/Shared/infrastructure/Logger'

import { TAGS } from '../tags'

const context = 'mooc'

const mongoConfig = MongoConfigFactory.createConfig()
const connectionClient = MikroOrmMongoClientFactory.createClient(
  context,
  mongoConfig,
  resolve(`${__dirname}/../../../../Contexts/Mooc`)
)

const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitFormatter = new RabbitMQQueueFormatter(context)
const rabbitConfigurer = new RabbitMQConfigurer(rabbitConnection, rabbitFormatter, 50)
const DomainEventFailoverPublisher = new MikroOrmMongoDomainEventFailoverPublisher(connectionClient)
const rabbitEventBus = RabbitMQEventBusFactory.create(
  DomainEventFailoverPublisher,
  rabbitConnection,
  rabbitFormatter,
  rabbitConfig
)

export const SharedModule = (builder: ContainerBuilder) => {
  builder.register<Promise<MikroORM<MongoDriver>>>(MikroORM<MongoDriver> as any).useFactory(() => {
    return connectionClient
  })
  builder.register(RabbitMQConnection).useFactory(() => {
    return rabbitConnection
  })
  builder.register(RabbitMQConfigurer).useFactory(() => {
    return rabbitConfigurer
  })
  builder.register(EventBus).useFactory(() => {
    return rabbitEventBus
  })
  builder
    .register(CommandBus)
    .useFactory((container) => {
      const commands = (container.findTaggedServiceIdentifiers<CommandHandler<Command>>(TAGS.CommandHandler) ?? []).map(
        (identifier) => container.get(identifier)
      )

      const handlers = new CommandHandlers(commands)
      const bus = new InMemoryCommandBus(handlers)
      return bus
    })
    .asSingleton()
  builder
    .register(QueryBus)
    .useFactory((container) => {
      const queries = (
        container.findTaggedServiceIdentifiers<QueryHandler<Query, Response>>(TAGS.QueryHandler) ?? []
      ).map((identifier) => container.get(identifier))

      const handlers = new QueryHandlers(queries)
      const bus = new InMemoryQueryBus(handlers)
      return bus
    })
    .asSingleton()
  builder.register(Monitoring).useFactory(() => {
    const monitoring = new SentryModule(SentryConfigFactory.createConfig())

    return monitoring
  })
  builder.register(Logger).useFactory(() => {
    const logger = new PinoLogger(LoggerConfigFactory.createConfig())
    return logger
  })
  builder.register(FatalErrorHandler).use(FatalErrorHandler)
}
