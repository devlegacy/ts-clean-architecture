import { RabbitMQConnection } from '@/Contexts/Shared/infrastructure/EventBus'

export class RabbitMQConnectionDouble extends RabbitMQConnection {
  async publish(_params: any): Promise<boolean> {
    throw new Error()
  }
}
