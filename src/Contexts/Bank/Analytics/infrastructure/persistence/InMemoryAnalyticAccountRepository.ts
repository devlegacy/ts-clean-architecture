import { InMemoryRepository } from '@/Contexts/Shared/infrastructure/persistence/memory'

import { AnalyticAccount, AnalyticAccountRepository } from '../../domain'

export class InMemoryAnalyticAccountRepository
  extends InMemoryRepository<AnalyticAccount>
  implements AnalyticAccountRepository
{
  protected override parser = AnalyticAccount.fromPrimitives

  override async find(id: AnalyticAccount['id']): Promise<Nullable<AnalyticAccount>> {
    const account = super.find(id)

    return account
  }

  async findAccountsPerCurrency(currency: string): Promise<AnalyticAccount[]> {
    const analyticAccounts = await super.all({ currency })
    return analyticAccounts
  }

  async trackNewAccount(account: AnalyticAccount): Promise<void> {
    await super.persist(account)
  }

  override async update(account: AnalyticAccount): Promise<void> {
    await super.update(account.id, account)
  }
}
