import { AtmAccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { AccountRepository, EURRatioService } from '@/Contexts/Bank/Accounts/domain'
import { InMemoryAccountRepository } from '@/Contexts/Bank/Accounts/infrastructure'
import { EventBusFactory } from '@/Contexts/Shared/infrastructure/EventBus/EventBusFactory'

import { AtmCLI } from './AtmCLI'

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
