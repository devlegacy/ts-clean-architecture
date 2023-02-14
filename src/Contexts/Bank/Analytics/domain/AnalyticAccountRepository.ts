import { Nullable } from '@/Contexts/Shared/domain'

import { AnalyticAccount } from './AnalyticAccount'

export interface AnalyticAccountRepository {
  find(accountId: AnalyticAccount['id']): Promise<Nullable<AnalyticAccount>>
  findAccountsPerCurrency(currency: string): Promise<AnalyticAccount[]>

  trackNewAccount(account: AnalyticAccount): Promise<void>
  update(account: AnalyticAccount): Promise<void>
}
