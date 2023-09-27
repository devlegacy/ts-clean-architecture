import { RabbitMQConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure/index.js'
import {
  DomainEventSubscriberResolver,
  RabbitMQConfigurer,
  RabbitMQConnection,
} from '@/Contexts/Shared/infrastructure/index.js'

import { container } from '../../modules/index.js'

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get(RabbitMQConnection)
    const {
      exchangeSettings: { name: exchange },
    } = RabbitMQConfigFactory.createConfig()
    await connection.connect()

    const configurer = container.get(RabbitMQConfigurer)
    const { items: subscribers } = DomainEventSubscriberResolver.fromContainer(container)

    await configurer.configure({
      exchange,
      subscribers,
    })
    await connection.close()
  }
}
