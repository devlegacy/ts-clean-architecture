import { InvalidArgumentException } from '../Exceptions'
import { StringValueObject } from './StringValueObject'

export class Money extends StringValueObject {
  static locales: Record<string, string> = {
    USD: 'en-US',
    INR: 'en-IN',
    EUR: 'de-DE',
  }
  readonly amount: number
  readonly currency: string

  constructor(amount: number, currency: string) {
    const dollarUS = Intl.NumberFormat(Money.locales[`${currency}`.toUpperCase()] ?? 'en-US', {
      style: 'currency',
      currency,
    })
    super(dollarUS.format(amount))
    this.amount = amount
    this.currency = currency.toUpperCase()
  }

  static usd(amount: number) {
    const money = new Money(amount, 'USD')
    return money
  }

  static eur(amount: number) {
    const money = new Money(amount, 'EUR')
    return money
  }

  static fromPrimitives(data: ReturnType<typeof Money.prototype.toPrimitives>): Money {
    return new Money(data.amount, data.currency)
  }

  ensureIsSameCurrency(vo: Money) {
    if (!this.isSameCurrency(vo)) throw new InvalidArgumentException('Incompatible currency')
  }

  isSameCurrency(vo: Money): boolean {
    return this.currency === vo.currency
  }

  add(vo: Money) {
    this.ensureIsSameCurrency(vo)
    return new Money(this.amount + vo.amount, this.currency)
  }

  subtract(vo: Money) {
    this.ensureIsSameCurrency(vo)
    return new Money(this.amount - vo.amount, this.currency)
  }

  isLessThan(vo: Money) {
    this.ensureIsSameCurrency(vo)
    return this.amount < vo.amount
  }

  isGreaterOrEqualThan(vo: Money) {
    this.ensureIsSameCurrency(vo)
    return this.amount >= vo.amount
  }

  isLessOrEqualThan(vo: Money) {
    this.ensureIsSameCurrency(vo)
    return this.value <= vo.value
  }

  toPrimitives() {
    return {
      amount: this.amount,
      currency: this.currency,
    }
  }
}
