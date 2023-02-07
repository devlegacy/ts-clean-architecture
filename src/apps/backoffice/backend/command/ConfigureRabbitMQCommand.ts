import { container } from 'tsyringe'

import { RabbitMQConfig } from '@/Contexts/Backoffice/Shared/infrastructure'
import { DomainEventSubscribers, RabbitMQConfigurer, RabbitMQConnection } from '@/Contexts/Shared/infrastructure'

import { TYPES } from '../../modules/types'

export class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.resolve<RabbitMQConnection>(TYPES.RabbitMQConnection)
    const { name: exchange } = container.resolve<RabbitMQConfig>(TYPES.RabbitMQConfig).exchangeSettings
    await connection.connect()

    const configurer = container.resolve<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer)
    const subscribers = DomainEventSubscribers.from().items

    await configurer.configure({
      exchange,
      subscribers,
    })
    await connection.close()
  }
}
