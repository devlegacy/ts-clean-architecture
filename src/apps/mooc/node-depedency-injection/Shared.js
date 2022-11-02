const { MongoConfigFactory, RabbitMQConfigFactory } = require('@/Contexts/Mooc/Shared/infrastructure')
const {
  RabbitMQConnection,
  RabbitMQConfigurer,
  RabbitMQQueueFormatter
} = require('@/Contexts/Shared/infrastructure/EventBus')
const { MikroORMMongoClientFactory } = require('@/Contexts/Shared/infrastructure/persistence')
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
