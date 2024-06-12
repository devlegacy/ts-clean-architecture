import {
  resolve,
} from 'node:path'
import {
  fileURLToPath,
  URL,
} from 'node:url'

import {
  Client as ElasticClient,
} from '@elastic/elasticsearch'
import {
  MikroORM,
} from '@mikro-orm/core'
import {
  MongoDriver,
} from '@mikro-orm/mongodb'
import {
  ContainerBuilder,
} from 'diod'

import {
  ElasticConfigFactory,
  LoggerConfigFactory,
  MongoConfigFactory,
  RabbitMQConfigFactory,
  RabbitMQEventBusFactory,
  SentryConfigFactory,
} from '#@/src/Contexts/Backoffice/Shared/infrastructure/index.js'
import {
  CommandBus,
  EventBus,
  Logger,
  Monitoring,
  QueryBus,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  CommandHandlers,
  ElasticClientFactory,
  FatalErrorHandler,
  InMemoryCommandBus,
  InMemoryQueryBus,
  MikroOrmMongoClientFactory,
  MikroOrmMongoDomainEventFailoverPublisher,
  QueryHandlers,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
  SentryMonitoring,
} from '#@/src/Contexts/Shared/infrastructure/index.js'
import {
  PinoLogger,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'
import {
  EnvironmentArranger,
  MikroOrmMongoEnvironmentArranger,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

import {
  TAGS,
} from '../tags.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const context = 'backoffice'
const mongoConfig = MongoConfigFactory.createConfig()
export const connectionClient = MikroOrmMongoClientFactory.createClient(
  context,
  mongoConfig,
  resolve(`${__dirname}/../../../../Contexts/Backoffice`),
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
  rabbitConfig,
)

const elasticConfig = ElasticConfigFactory.createConfig()
const elasticClient = ElasticClientFactory.createClient(context, elasticConfig)

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
  builder.register<Promise<ElasticClient>>(ElasticClient as any).useFactory(() => {
    return elasticClient
  })
  builder
    .register(CommandBus)
    .useFactory((container) => {
      const commands = ((container.findTaggedServiceIdentifiers(TAGS.CommandHandler) as any[]) ?? []).map(
        (identifier) => container.get(identifier),
      )

      const handler = new CommandHandlers(commands as any[])
      return new InMemoryCommandBus(handler)
    })
    .asSingleton()
  builder
    .register(QueryBus)
    .useFactory((container) => {
      const queries = ((container.findTaggedServiceIdentifiers(TAGS.QueryHandler) as any[]) ?? []).map((identifier) =>
        container.get(identifier))
      const handler = new QueryHandlers(queries as any[])
      return new InMemoryQueryBus(handler)
    })
    .asSingleton()
  builder.register(Monitoring).useFactory(() => {
    const monitoring = new SentryMonitoring(SentryConfigFactory.createConfig())

    return monitoring
  })
  builder.register(Logger).useFactory(() => {
    const logger = new PinoLogger(LoggerConfigFactory.createConfig())
    return logger
  })
  builder.register(FatalErrorHandler).use(FatalErrorHandler)
  builder.register(EnvironmentArranger).use(MikroOrmMongoEnvironmentArranger)
}
