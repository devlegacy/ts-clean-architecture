import { AccountUseCase } from '@/Contexts/Bank/Accounts/application/index.js'
import { AccountRepository, EURRatioService } from '@/Contexts/Bank/Accounts/domain/index.js'
import {
  MongoAccountEventStore,
  MongoAccountRepository,
  ProxyAccountRepository,
} from '@/Contexts/Bank/Accounts/infrastructure/persistence/index.js'
import {
  AnalyticAccountTrackerUseCase,
  TrackAnalyticAccountOnAccountCreated,
} from '@/Contexts/Bank/Analytics/application/index.js'
import { MongoAnalyticAccountRepository } from '@/Contexts/Bank/Analytics/infrastructure/index.js'
import { MongoConfigFactory } from '@/Contexts/Bank/Shared/infrastructure/persistence/mongo/MongoConfigFactory.js'
import { RabbitMQConfigFactory, RabbitMQEventBusFactory } from '@/Contexts/Bank/Shared/infrastructure/RabbitMQ/index.js'
import {
  MongoDomainEventFailoverPublisher,
  RabbitMQConnection,
  RabbitMQQueueFormatter,
} from '@/Contexts/Shared/infrastructure/index.js'
import { MongoClientFactory } from '@/Contexts/Shared/infrastructure/Persistence/mongo/MongoClientFactory.js'

import { WindowCLI } from './WindowCLI.js'

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
const currentRepository: AccountRepository = new MongoAccountRepository(connectionClient)
const targetRepository: AccountRepository = new MongoAccountEventStore(connectionClient)
const accountRepository: AccountRepository = new ProxyAccountRepository(currentRepository, targetRepository)
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
    const cli = new WindowCLI(container.accountUseCase)
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
      items: [new TrackAnalyticAccountOnAccountCreated(container.analyticAccountTrackerUseCase)],
    }
    await eventBus.addSubscribers(subscribers)
  }
}
