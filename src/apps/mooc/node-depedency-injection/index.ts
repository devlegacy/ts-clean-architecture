import { ContainerBuilder } from 'node-dependency-injection'

import { MongoConfigFactory, RabbitMQConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure/index.js'
import { InMemoryCommandBus } from '@/Contexts/Shared/infrastructure/CommandBus/index.js'
import {
  InMemoryAsyncEventBus,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure/EventBus/index.js'
import { logger } from '@/Contexts/Shared/infrastructure/Logger/index.js'
import { MikroOrmMongoClientFactory } from '@/Contexts/Shared/infrastructure/Persistence/index.js'
import { InMemoryQueryBus } from '@/Contexts/Shared/infrastructure/QueryBus/index.js'

import { TYPES } from './types.js'

const container = new ContainerBuilder()
container.logger = logger()

const context = 'mooc'
const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroOrmMongoClientFactory.createClient(context, mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitFormatter = new RabbitMQQueueFormatter(context)
const rabbitConfigurer = new RabbitMQConfigurer(rabbitConnection, rabbitFormatter, 50)

container.register(TYPES.MongoConfig, mongoConfig)
container.register(TYPES.MongoClient, mongoClient)
container.register(TYPES.EventBus, InMemoryAsyncEventBus)
container.register(TYPES.RabbitMQConfig, rabbitConfig)
container.register(TYPES.RabbitMQConfigurer, rabbitConfigurer)
container.register(TYPES.CommandBus, InMemoryCommandBus)
container.register(TYPES.QueryBus, InMemoryQueryBus)

export default container
