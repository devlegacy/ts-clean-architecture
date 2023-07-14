import { InMemoryRepository } from '@/Contexts/Shared/infrastructure/Persistence/memory'

import { Account, AccountRepository } from '../../domain'

export class InMemoryAccountRepository extends InMemoryRepository<Account> implements AccountRepository {
  protected override parser = Account.fromPrimitives

  async save(account: Account): Promise<void> {
    await this.persist(account)
  }

  override async update(account: Account): Promise<void> {
    await super.update(account.id, account)
  }

  override async find(id: Account['id']): Promise<Nullable<Account>> {
    const account = super.find(id)

    return account
  }
}
