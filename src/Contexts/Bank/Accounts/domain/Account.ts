import { AggregateRoot, InvalidArgumentError, Money } from '@/Contexts/Shared/domain'

import { DepositEvent, WithdrawalEvent } from '../../Shared/domain'
import { AccountCreatedDomainEvent } from './AccountCreatedDomainEvent'
import { EURRatioService } from './EURRatioService'

export class Account extends AggregateRoot {
  private static MAX_CREDIT_IN_EUROS = 10
  readonly id: string
  readonly name: string
  private _balance: Money

  get balance() {
    return this._balance
  }

  constructor(id: string, name: string, balance: Money) {
    super()
    this.id = id
    this.name = name
    this._balance = balance
  }

  static create(id: string, name: string, currency: string): Account {
    const account = new Account(id, name, new Money(0, currency))
    const event = new AccountCreatedDomainEvent({
      aggregateId: account.id,
      name: account.name,
      balance: account._balance.toPrimitives(),
    })
    account.record(event)
    return account
  }

  static override fromPrimitives(data: ReturnType<typeof Account.prototype.toPrimitives>): Account {
    return new Account(data.id, data.name, Money.fromPrimitives(data.balance))
  }

  withdraw(amount: Money, ratioService: EURRatioService) {
    if (!this._balance.isSameCurrency(amount)) throw new InvalidArgumentError('Incompatible currency')
    const maxAmountWithdrawable = this.getMaxAmountWithdrawable(amount, ratioService)
    if (!maxAmountWithdrawable.isGreaterOrEqualThan(amount)) throw new InvalidArgumentError('Insufficient funds')
    this._balance = this._balance.subtract(amount)
    const event = new WithdrawalEvent({
      aggregateId: this.id,
      balance: this._balance.toPrimitives(),
    })
    this.record(event)
  }

  deposit(amount: Money) {
    if (!amount.isSameCurrency(this._balance)) throw new InvalidArgumentError('Incompatible currency')
    this._balance = this._balance.add(amount)
    const event = new DepositEvent({
      aggregateId: this.id,
      balance: this._balance.toPrimitives(),
    })
    this.record(event)
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      balance: this._balance.toPrimitives(),
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
