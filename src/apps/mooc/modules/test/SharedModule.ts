import { MikroORM } from '@mikro-orm/core'
import { MongoDriver } from '@mikro-orm/mongodb'
import { ContainerBuilder } from 'diod'

import { RabbitMQEventBusFactory } from '@/Contexts/Backoffice/Shared/infrastructure'
import {
  LoggerConfigFactory,
  MongoConfigFactory,
  RabbitMQConfigFactory,
  SentryConfigFactory,
} from '@/Contexts/Mooc/Shared/infrastructure'
import { CommandBus, EventBus, Logger, Monitoring, QueryBus } from '@/Contexts/Shared/domain'
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
import { EnvironmentArranger, MikroOrmMongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { TAGS } from '../tags'

const context = 'mooc'

const mongoConfig = MongoConfigFactory.createConfig()
const connectionClient = MikroOrmMongoClientFactory.createClient(context, mongoConfig)

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
      const commands = ((container.findTaggedServiceIdentifiers(TAGS.CommandHandler) as any[]) ?? []).map(
        (identifier) => container.get(identifier)
      )

      const handler = new CommandHandlers(commands as any[])
      return new InMemoryCommandBus(handler)
    })
    .asSingleton()
  builder
    .register(QueryBus)
    .useFactory((container) => {
      const queries = ((container.findTaggedServiceIdentifiers(TAGS.QueryHandler) as any[]) ?? []).map((identifier) =>
        container.get(identifier)
      )
      const handler = new QueryHandlers(queries as any[])
      return new InMemoryQueryBus(handler)
    })
    .asSingleton()
  builder.register(Monitoring).useFactory(() => {
    const monitoring = new SentryModule({ options: SentryConfigFactory.createConfig() })

    return monitoring
  })
  builder.register(Logger).useFactory(() => {
    const logger = new PinoLogger(LoggerConfigFactory.createConfig())
    return logger
  })
  builder.register(FatalErrorHandler).use(FatalErrorHandler)
  builder.register(EnvironmentArranger).use(MikroOrmMongoEnvironmentArranger)
}
