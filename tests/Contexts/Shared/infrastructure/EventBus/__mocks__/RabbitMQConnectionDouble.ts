import { RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus/index.js'

export class RabbitMQConnectionDouble extends RabbitMQConnection {
  override async publish(_params: any): Promise<boolean> {
    throw new Error()
  }
}
