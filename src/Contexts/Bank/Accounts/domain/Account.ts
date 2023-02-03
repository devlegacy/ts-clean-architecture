import { InvalidArgumentException, Money } from '@/Contexts/Shared/domain'

import { EURRatioService } from './EURRatioService'

export class Account {
  private static MAX_CREDIT_IN_EUROS = 10
  readonly id: string
  readonly name: string
  private _balance: Money

  get balance() {
    return this._balance
  }

  constructor(id: string, name: string, balance: Money) {
    this.id = id
    this.name = name
    this._balance = balance
  }

  static create(id: string, name: string, currency: string): Account {
    return new Account(id, name, new Money(0, currency))
  }

  static fromPrimitives(data: ReturnType<typeof Account.prototype.toPrimitives>): Account {
    return new Account(data.id, data.name, Money.fromPrimitives(data.balance))
  }

  withdraw(amount: Money, ratioService: EURRatioService) {
    if (!this._balance.isSameCurrency(amount)) throw new InvalidArgumentException('Incompatible currency')
    const maxAmountWithdrawable = this.getMaxAmountWithdrawable(amount, ratioService)
    if (!maxAmountWithdrawable.isGreaterOrEqualThan(amount)) throw new InvalidArgumentException('Insufficient funds')
    this._balance = this._balance.subtract(amount)
  }

  deposit(amount: Money) {
    if (!amount.isSameCurrency(this._balance)) throw new InvalidArgumentException('Incompatible currency')
    this._balance = this._balance.add(amount)
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      balance: this._balance.toPrimitives()
    }
  }

  private getMaxAmountWithdrawable(requested: Money, ratioService: EURRatioService) {
    const maxCreditInRequestedCurrency = this.getMaxCreditInRequestedCurrency(requested, ratioService)
    return this.balance.add(maxCreditInRequestedCurrency)
  }

  private getMaxCreditInRequestedCurrency(requested: Money, ratioService: EURRatioService) {
    const ratioEurRequestedCurrency = ratioService.getEURRatioForCurrency(requested.currency)
    return new Money(Account.MAX_CREDIT_IN_EUROS * ratioEurRequestedCurrency, requested.currency)
  }
}
