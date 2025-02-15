import {
  RabbitMQConfigFactory,
} from '#@/src/Contexts/Backoffice/Shared/infrastructure/index.js'
import {
  DomainEventSubscriberResolver,
  RabbitMQConfigurer,
  RabbitMQConnection,
} from '#@/src/Contexts/Shared/infrastructure/index.js'

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
    const subscribers = DomainEventSubscriberResolver.fromContainer(container).items

    await configurer.configure({
      exchange,
      subscribers,
    })
    await connection.close()
  }
}
