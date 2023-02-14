import { AccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { AccountRepository, EURRatioService } from '@/Contexts/Bank/Accounts/domain'
import { MongoAccountRepository } from '@/Contexts/Bank/Accounts/infrastructure/persistence'
import { AnalyticAccountTrackerUseCase, TrackOnAccountCreatedEventHandler } from '@/Contexts/Bank/Analytics/application'
import { MongoAnalyticAccountRepository } from '@/Contexts/Bank/Analytics/infrastructure'
import { MongoConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/persistence/mongo/MongoConfigFactory'
import { RabbitMQConfigFactory, RabbitMQEventBusFactory } from '@/Contexts/Bank/Shared/infrastructure/RabbitMQ'
import {
  MongoDomainEventFailoverPublisher,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory'

import { WindowCLI } from './WindowCLI'

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
  rabbitConfig
)

const container: {
  accountUseCase: AccountUseCase
  analyticAccountTrackerUseCase: AnalyticAccountTrackerUseCase
} = {} as any
const accountRepository: AccountRepository = new MongoAccountRepository(connectionClient)
const ratioAdapter = new EURRatioService()

const accountUseCase = new AccountUseCase(accountRepository, ratioAdapter, rabbitEventBus)
container.accountUseCase = accountUseCase

const analyticAccountRepository = new MongoAnalyticAccountRepository(connectionClient)
const analyticAccountTrackerUseCase = new AnalyticAccountTrackerUseCase(analyticAccountRepository)
container.analyticAccountTrackerUseCase = analyticAccountTrackerUseCase

export class WindowCLIApp {
  async start() {
    await this.startSubscribers()
    this.startCli()
  }

  startCli() {
    const cli = new WindowCLI(container.accountUseCase, container.analyticAccountTrackerUseCase)
    cli.render()
  }

  async startSubscribers() {
    await this.configureEventBus()
  }

  async configureEventBus() {
    await rabbitConnection.connect()
    const eventBus = rabbitEventBus

    // Should be DomainEventSubscribers this is a simple hack
    const subscribers: any = {
      items: [new TrackOnAccountCreatedEventHandler(container.analyticAccountTrackerUseCase)],
    }
    await eventBus.addSubscribers(subscribers)
  }
}
