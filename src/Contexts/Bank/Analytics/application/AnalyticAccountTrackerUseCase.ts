import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  AnalyticAccount,
  type AnalyticAccountRepository,
} from '../domain/index.js'

export class AnalyticAccountTrackerUseCase {
  constructor(private readonly analyticRepository: AnalyticAccountRepository) {}

  async trackNewAccount(accountId: string, currency: string) {
    const account = new AnalyticAccount(
      accountId,
      currency,
    )
    await this.analyticRepository.trackNewAccount(account)
  }

  async trackConnection(id: string) {
    const account = await this.analyticRepository.find(id)
    if (!account) throw new EntityNotFoundError(`Account <${id}> not found`)
    account.addConnection()
    await this.analyticRepository.update(account)
  }

  async findAccountsPerCurrency(currency: string) {
    const accounts = await this.analyticRepository.findAccountsPerCurrency(currency)
    return accounts
  }
}
