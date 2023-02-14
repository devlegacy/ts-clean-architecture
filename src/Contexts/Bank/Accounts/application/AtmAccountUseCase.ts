import { EntityNotFoundError, EventBus, Money } from '@/Contexts/Shared/domain'

import { Account, AccountRepository, EURRatioService } from '../domain'

export class AtmAccountUseCase {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly ratioService: EURRatioService,
    private readonly eventBus: EventBus
  ) {}

  async create(id: string, name: string, currency: string): Promise<string> {
    const account = Account.create(id, name, currency)
    await this.accountRepository.save(account)

    return account.id
  }

  async find(id: string): Promise<Account> {
    const account = await this.accountRepository.find(id)
    if (!account) throw new EntityNotFoundError(`Unknown account ${id}`)

    return account
  }

  async deposit(id: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(id)
    account.deposit(new Money(amount, currency))

    await this.accountRepository.update(account)
    await this.eventBus.publish(account.pullDomainEvents())
  }

  async withdraw(id: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(id)
    account.withdraw(new Money(amount, currency), this.ratioService)

    await this.accountRepository.update(account)
    await this.eventBus.publish(account.pullDomainEvents())
  }
}
