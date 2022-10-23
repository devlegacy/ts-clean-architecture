import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence'

export class RabbitMQMongoClientMother {
  static async create() {
    return MongoClientFactory.createClient('shared', {
      url: 'mongodb://localhost:27017/mooc-backend-test1'
    })
  }
}
