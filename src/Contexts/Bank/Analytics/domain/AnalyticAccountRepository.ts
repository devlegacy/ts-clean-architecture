import {
  AnalyticAccount,
} from './AnalyticAccount.js'

export interface AnalyticAccountRepository {
  find(id: AnalyticAccount['id']): Promise<Nullable<AnalyticAccount>>
  findAccountsPerCurrency(currency: AnalyticAccount['currency']): Promise<AnalyticAccount[]>

  trackNewAccount(account: AnalyticAccount): Promise<void>
  update(account: AnalyticAccount): Promise<void>
}
