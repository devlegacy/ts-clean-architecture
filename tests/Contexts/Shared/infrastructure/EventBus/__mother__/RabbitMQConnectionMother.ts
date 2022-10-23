import { RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus'

import { RabbitMQConnectionDouble } from '../__mocks__'
import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother'

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
