import {
  RabbitMQConfigFactory,
} from '#@/src/Contexts/Mooc/Shared/infrastructure/index.js'
import {
  DomainEventSubscriberResolver,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscriberResolver.js'
import {
  RabbitMQConfigurer,
  RabbitMQConnection,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/RabbitMQ/index.js'

import {
  container,
} from '../../modules/index.js'

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get(RabbitMQConnection)
    const {
      exchangeSettings: {
        name: exchange,
      },
    } = RabbitMQConfigFactory.createConfig()
    await connection.connect()

    const configurer = container.get(RabbitMQConfigurer)
    const {
      items: subscribers,
    } = DomainEventSubscriberResolver.fromContainer(container)

    await configurer.configure({
      exchange,
      subscribers,
    })
    await connection.close()
  }
}
