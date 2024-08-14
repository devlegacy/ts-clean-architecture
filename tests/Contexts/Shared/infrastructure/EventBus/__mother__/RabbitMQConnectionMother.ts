import {
  RabbitMQConnection,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/index.js'

import {
  RabbitMQConnectionDouble,
} from '../__mocks__/RabbitMQConnectionDouble.js'
import {
  RabbitMQConnectionConfigurationMother,
} from './RabbitMQConnectionConfigurationMother.js'

export class RabbitMQConnectionMother {
  static async create() {
    const config = RabbitMQConnectionConfigurationMother.create()
    const connection = new RabbitMQConnection(config)
    await connection.connect()
    return connection
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create())
  }
}
