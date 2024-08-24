import {
  AtmAccountUseCase,
} from '#@/src/Contexts/Bank/Accounts/application/index.js'
import {
  type AccountRepository,
  EURRatioService,
} from '#@/src/Contexts/Bank/Accounts/domain/index.js'
import {
  InMemoryAccountRepository,
} from '#@/src/Contexts/Bank/Accounts/infrastructure/index.js'
import {
  EventBusFactory,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/EventBusFactory.js'

import {
  AtmCLI,
} from './AtmCLI.js'

export class AtmCLIApp {
  private container: {
    atmAccountUseCase: AtmAccountUseCase
  } = {} as any

  start() {
    this.startCli()
  }

  startCli() {
    const repository: AccountRepository = new InMemoryAccountRepository()
    const ratioAdapter = new EURRatioService()

    const useCase = new AtmAccountUseCase(repository, ratioAdapter, EventBusFactory.instance)
    this.container.atmAccountUseCase = useCase

    const cli = new AtmCLI(this.container.atmAccountUseCase)
    cli.render()
  }
}
