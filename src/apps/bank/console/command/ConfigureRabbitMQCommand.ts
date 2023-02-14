import { AnalyticAccountTrackerUseCase, TrackOnAccountCreatedEventHandler } from '@/Contexts/Bank/Analytics/application'
import { MongoAnalyticAccountRepository } from '@/Contexts/Bank/Analytics/infrastructure/persistence'
import { MongoConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
import { RabbitMQConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/RabbitMQ'
import {
  MongoClientFactory,
  RabbitMQConfigurer,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure'

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
      new TrackOnAccountCreatedEventHandler(new AnalyticAccountTrackerUseCase(analyticAccountRepository)),
    ]

    await configurer.configure({
      exchange,
      subscribers,
    })

    await connection.close()
  }
}
