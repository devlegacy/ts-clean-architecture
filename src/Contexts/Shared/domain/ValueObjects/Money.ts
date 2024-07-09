import {
  InvalidArgumentError,
} from '../Errors/index.js'

export class Money {
  static locales: Record<string, string> = {
    USD: 'en-US',
    INR: 'en-IN',
    EUR: 'de-DE',
  }

  readonly amount: number
  readonly currency: string
  readonly format: string

  constructor(amount: number, currency: string) {
    const dollarUS = new Intl.NumberFormat(Money.locales[`${currency}`.toUpperCase()] ?? 'en-US', {
      style: 'currency',
      currency,
    })
    this.format = dollarUS.format(amount)
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

  isSameCurrency(vo: Money): boolean {
    return this.currency === vo.currency
  }

  add(vo: Money) {
    this.ensureIsTheSameCurrency(vo)
    return new Money(this.amount + vo.amount, this.currency)
  }

  subtract(vo: Money) {
    this.ensureIsTheSameCurrency(vo)
    return new Money(this.amount - vo.amount, this.currency)
  }

  isLessThan(vo: Money) {
    this.ensureIsTheSameCurrency(vo)
    return this.amount < vo.amount
  }

  isGreaterOrEqualThan(vo: Money) {
    this.ensureIsTheSameCurrency(vo)
    return this.amount >= vo.amount
  }

  isLessOrEqualThan(vo: Money) {
    this.ensureIsTheSameCurrency(vo)
    return this.amount <= vo.amount
  }

  toPrimitives() {
    return {
      amount: this.amount,
      currency: this.currency,
    }
  }

  private ensureIsTheSameCurrency(vo: Money) {
    if (!this.isSameCurrency(vo)) throw new InvalidArgumentError('Incompatible currency')
  }
}
