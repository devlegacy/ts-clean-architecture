import { RabbitMQConfigFactory } from '@/Contexts/Mooc/Shared/infrastructure'
import { DomainEventSubscriberResolver, RabbitMQConfigurer, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { container } from '../../modules'

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get(RabbitMQConnection)
    const { name: exchange } = RabbitMQConfigFactory.createConfig().exchangeSettings
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
