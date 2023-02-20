import { EntityNotFoundError, EventBus, Money } from '@/Contexts/Shared/domain'

import { Account, AccountRepository, EURRatioService } from '../domain'

export class AccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly ratioService: EURRatioService,
    private readonly eventBus: EventBus
  ) {}

  async create(id: string, name: string, currency: string): Promise<string> {
    const account = Account.create(id, name, currency)
    const events = account.pullDomainEvents()

    await this.accountRepository.save(account)
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
    const events = account.pullDomainEvents()

    await this.accountRepository.update(account)
    await this.eventBus.publish(events)
  }

  async withdraw(id: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(id)
    const money = new Money(amount, currency)

    account.withdraw(money, this.ratioService)
    const events = account.pullDomainEvents()

    await this.accountRepository.update(account)
    await this.eventBus.publish(events)
  }
}
