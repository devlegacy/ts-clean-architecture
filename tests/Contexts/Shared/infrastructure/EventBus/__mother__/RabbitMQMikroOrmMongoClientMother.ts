import { MikroOrmMongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence'

export class RabbitMQMikroOrmMongoClientMother {
  static async create() {
    return MikroOrmMongoClientFactory.createClient('shared', {
      url: 'mongodb://127.0.0.1:27017/mooc-backend-test',
    })
  }
}
