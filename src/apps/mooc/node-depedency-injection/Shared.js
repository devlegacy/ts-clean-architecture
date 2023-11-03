const { MongoConfigFactory, RabbitMQConfigFactory } = require('@/Contexts/Mooc/Shared/infrastructure/index.js')
const {
  RabbitMQConnection,
  RabbitMQConfigurer,
  RabbitMQQueueFormatter
} = require('@/Contexts/Shared/infrastructure/EventBus/index.js')
const { MikroORMMongoClientFactory } = require('@/Contexts/Shared/infrastructure/Persistence/index.js')
const { TYPES } = require('./types')

const mongoConfig = MongoConfigFactory.createConfig()
const mongoClient = MikroORMMongoClientFactory.createClient('mooc', mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitConfigure = new RabbitMQConfigurer(rabbitConnection, new RabbitMQQueueFormatter('mooc'), 50)

module.exports = {
  services: {
    [`${TYPES.MongoConfig}`]: {
      factory: {
        class: MongoConfigFactory,
        method: 'createConfig'
      }
    }
  }
}
