import { EntityNotFoundError } from '@/Contexts/Shared/domain'

import { AnalyticAccount, AnalyticAccountRepository } from '../domain'

export class AnalyticAccountTrackerUseCase {
  constructor(private readonly analyticRepository: AnalyticAccountRepository) {}

  async trackNewAccount(accountId: string, currency: string) {
    const account = new AnalyticAccount(accountId, currency)
    await this.analyticRepository.trackNewAccount(account)
  }

  async trackConnection(accountId: string) {
    const account = await this.analyticRepository.find(accountId)
    if (!account) throw new EntityNotFoundError(`Account ${accountId} not found`)
    account.addConnection()
    await this.analyticRepository.update(account)
  }

  async findAccountsPerCurrency(currency: string) {
    const accounts = await this.analyticRepository.findAccountsPerCurrency(currency)
    return accounts
  }
}
