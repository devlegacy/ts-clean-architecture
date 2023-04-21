import { Account, AccountRepository } from '../../domain'

export class ProxyAccountRepository implements AccountRepository {
  constructor(
    private readonly currentRepository: AccountRepository,
    private readonly targetRepository: AccountRepository
  ) {}

  async save(account: Account): Promise<void> {
    await this.currentRepository.save(account)
    await this.targetRepository.save(account)
  }

  async update(account: Account): Promise<void> {
    await this.currentRepository.update(account)
    await this.targetRepository.update(account)
  }

  async find(id: Account['id']): Promise<Nullable<Account>> {
    const account = await this.targetRepository.find(id)

    return account
  }
}
