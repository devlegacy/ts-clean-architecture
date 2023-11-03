import {
  AnalyticAccountTrackerUseCase,
  TrackAnalyticAccountOnAccountCreated,
} from '@/Contexts/Bank/Analytics/application/index.js'
import { MongoAnalyticAccountRepository } from '@/Contexts/Bank/Analytics/infrastructure/persistence/index.js'
import { MongoConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/persistence/mongo/MongoConfigFactory.js'
import { RabbitMQConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/RabbitMQ/index.js'
import {
  MongoClientFactory,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure/index.js'

export class ConfigureRabbitMQCommand {
  static async run() {
    const context = 'bank'

    const mongoConfig = MongoConfigFactory.createConfig()
    const connectionClient = MongoClientFactory.createClient(context, mongoConfig)
    const rabbitConfig = RabbitMQConfigFactory.createConfig()
    const rabbitConnection = new RabbitMQConnection(rabbitConfig)
    const rabbitFormatter = new RabbitMQQueueFormatter(context)
    const rabbitConfigurer = new RabbitMQConfigurer(rabbitConnection, rabbitFormatter, 50)
    // const DomainEventFailoverPublisher = new MongoDomainEventFailoverPublisher(connectionClient)
    // const rabbitEventBus = RabbitMQEventBusFactory.create(
    //   DomainEventFailoverPublisher,
    //   rabbitConnection,
    //   rabbitFormatter,
    //   rabbitConfig
    // )

    const connection = rabbitConnection
    const { name: exchange } = rabbitConfig.exchangeSettings
    await connection.connect()

    const configurer = rabbitConfigurer
    const analyticAccountRepository = new MongoAnalyticAccountRepository(connectionClient)
    const subscribers = [
      new TrackAnalyticAccountOnAccountCreated(new AnalyticAccountTrackerUseCase(analyticAccountRepository)),
    ]

    await configurer.configure({
      exchange,
      subscribers,
    })

    await connection.close()
  }
}
