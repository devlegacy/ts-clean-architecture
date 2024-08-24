import {
  AnalyticAccountTrackerUseCase,
  TrackAnalyticAccountOnAccountCreated,
} from '#@/src/Contexts/Bank/Analytics/application/index.js'
import {
  MongoAnalyticAccountRepository,
} from '#@/src/Contexts/Bank/Analytics/infrastructure/index.js'
import {
  MongoConfigFactory,
} from '#@/src/Contexts/Bank/Shared/infrastructure/persistence/mongo/MongoConfigFactory.js'
import {
  RabbitMQConfigFactory,
  RabbitMQEventBusFactory,
} from '#@/src/Contexts/Bank/Shared/infrastructure/RabbitMQ/index.js'
import {
  MongoDomainEventFailoverPublisher,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '#@/src/Contexts/Shared/infrastructure/index.js'
import {
  MongoClientFactory,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/mongo/MongoClientFactory.js'

import {
  AnalyticCLI,
} from './AnalyticCLI.js'

const context = 'bank'
const mongoConfig = MongoConfigFactory.createConfig()
const connectionClient = MongoClientFactory.createClient(context, mongoConfig)
const rabbitConfig = RabbitMQConfigFactory.createConfig()
const rabbitConnection = new RabbitMQConnection(rabbitConfig)
const rabbitFormatter = new RabbitMQQueueFormatter(context)
const DomainEventFailoverPublisher = new MongoDomainEventFailoverPublisher(connectionClient)
const rabbitEventBus = RabbitMQEventBusFactory.create(
  DomainEventFailoverPublisher,
  rabbitConnection,
  rabbitFormatter,
  rabbitConfig,
)

const container: {
  analyticAccountTrackerUseCase: AnalyticAccountTrackerUseCase
} = {} as any

const repository = new MongoAnalyticAccountRepository(connectionClient)
const useCase = new AnalyticAccountTrackerUseCase(repository)
container.analyticAccountTrackerUseCase = useCase

export class AnalyticsCLIApp {
  async start() {
    this.startCli()
    await this.startSubscribers()
  }

  startCli() {
    const cli = new AnalyticCLI(useCase)
    cli.render()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    try {
      await rabbitConnection.connect()
      const eventBus = rabbitEventBus
      // Should be DomainEventSubscribers this is a simple hack
      const subscribers: any = {
        items: [
          new TrackAnalyticAccountOnAccountCreated(container.analyticAccountTrackerUseCase),
        ],
      }
      await eventBus.addSubscribers(subscribers)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
