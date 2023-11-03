import { AggregateRoot, DomainEvent, InvalidArgumentError, Money } from '@/Contexts/Shared/domain/index.js'

import { DepositEvent, WithdrawalEvent } from '../../Shared/domain/index.js'
import { AccountCreatedDomainEvent } from './AccountCreatedDomainEvent.js'
import { EURRatioService } from './EURRatioService.js'

export type AccountEntityType = Entity<Account>
export type AccountPrimitiveType = Primitives<Account>

export class Account extends AggregateRoot {
  private static MAX_CREDIT_IN_EUROS = 10

  readonly id: string
  private _name: string
  private _balance: Money

  get name() {
    return this._name
  }

  get balance() {
    return this._balance
  }

  constructor(id: string, name: string, balance: Money) {
    super()
    this.id = id
    this._name = name
    this._balance = balance
  }

  static create(id: string, name: string, currency: string): Account {
    const money = new Money(0, currency)
    const account = new Account(id, name, money)
    const event = new AccountCreatedDomainEvent({
      aggregateId: account.id,
      name: account.name,
      balance: account._balance.toPrimitives(),
    })
    account.record(event)
    account.handleEvent(event)
    return account
  }

  static override fromPrimitives(data: ReturnType<typeof Account.prototype.toPrimitives>): Account {
    return new Account(data.id, data.name, Money.fromPrimitives(data.balance))
  }

  withdraw(amount: Money, ratioService: EURRatioService) {
    // this.ensureIsTheSameCurrency(amount)
    this.ensureEnoughFunds(amount, ratioService)

    // this._balance = this._balance.subtract(amount)
    const event = new WithdrawalEvent({
      aggregateId: this.id,
      balance: amount.toPrimitives(),
    })
    this.record(event)
    this.handleEvent(event)
  }

  deposit(amount: Money) {
    // this.ensureIsTheSameCurrency(amount)
    const event = new DepositEvent({
      aggregateId: this.id,
      balance: amount.toPrimitives(),
    })
    this.record(event)
    this.handleEvent(event)
  }

  override handleEvent(event: DomainEvent) {
    switch (event.constructor) {
      case AccountCreatedDomainEvent:
        this._create(event as AccountCreatedDomainEvent)
        break
      case DepositEvent:
        this._deposit(event as DepositEvent)
        break
      case WithdrawalEvent:
        this._withdraw(event as WithdrawalEvent)
        break
      default:
        throw new Error(`Unknown event type: ${event.constructor.name}`)
    }
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      balance: this._balance.toPrimitives(),
    }
  }

  // private ensureIsTheSameCurrency(amount: Money) {
  //   if (!this._balance.isSameCurrency(amount)) throw new InvalidArgumentError('Incompatible currency')
  // }

  private _create(event: AccountCreatedDomainEvent) {
    this._name = event.name
    this._balance = new Money(event.balance.amount ?? 0, event.balance.currency)
  }

  private _deposit(event: DepositEvent) {
    const money = new Money(event.balance.amount, event.balance.currency)
    this._balance = this._balance.add(money)
  }

  private _withdraw(event: WithdrawalEvent) {
    const money = new Money(event.balance.amount, event.balance.currency)
    this._balance = this.balance.subtract(money)
  }

  private ensureEnoughFunds(amount: Money, ratioService: EURRatioService) {
    const maxAmountWithdrawable = this.getMaxAmountWithdrawable(amount, ratioService)
    if (!maxAmountWithdrawable.isGreaterOrEqualThan(amount)) throw new InvalidArgumentError('Insufficient funds')
  }

  private getMaxAmountWithdrawable(requested: Money, ratioService: EURRatioService) {
    const maxCreditInRequestedCurrency = this.getMaxCreditInRequestedCurrency(requested, ratioService)
    return this.balance.add(maxCreditInRequestedCurrency)
  }

  private getMaxCreditInRequestedCurrency(requested: Money, ratioService: EURRatioService) {
    const ratioEurRequestedCurrency = ratioService.getEURRatioForCurrency(requested.currency)!
    const money = new Money(Account.MAX_CREDIT_IN_EUROS * ratioEurRequestedCurrency, requested.currency)
    return money
  }
}
