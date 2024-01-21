import { EntityNotFoundError, EventBus, Money } from '@/Contexts/Shared/domain/index.js'

import { Account, type AccountRepository, EURRatioService } from '../domain/index.js'

export class AccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly ratioService: EURRatioService,
    private readonly eventBus: EventBus,
  ) {}

  async create(id: string, name: string, currency: string): Promise<string> {
    const account = Account.create(id, name, currency)

    await this.accountRepository.save(account)

    const events = account.pullDomainEvents()
    await this.eventBus.publish(events)

    return account.id
  }

  async find(id: string): Promise<Account> {
    const account = await this.accountRepository.find(id)
    if (!account) throw new EntityNotFoundError(`Unknown account <${id}>`)

    return account
  }

  async deposit(id: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(id)
    const money = new Money(amount, currency)
    account.deposit(money)

    await this.accountRepository.update(account)

    const events = account.pullDomainEvents()
    await this.eventBus.publish(events)
  }

  async withdraw(id: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(id)
    const money = new Money(amount, currency)

    account.withdraw(money, this.ratioService)

    await this.accountRepository.update(account)

    const events = account.pullDomainEvents()
    await this.eventBus.publish(events)
  }
}
