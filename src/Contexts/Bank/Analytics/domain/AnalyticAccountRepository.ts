import { Nullable } from '@/Contexts/Shared/domain'

import { AnalyticAccount } from './AnalyticAccount'

export interface AnalyticAccountRepository {
  find(id: AnalyticAccount['id']): Promise<Nullable<AnalyticAccount>>
  findAccountsPerCurrency(currency: AnalyticAccount['currency']): Promise<AnalyticAccount[]>

  trackNewAccount(account: AnalyticAccount): Promise<void>
  update(account: AnalyticAccount): Promise<void>
}
