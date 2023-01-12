import { StringValueObject } from './StringValueObject'

export class Money extends StringValueObject {
  static locales: Record<string, string> = {
    USD: 'en-US',
    INR: 'en-IN',
    EUR: 'de-DE'
  }
  readonly amount: number
  readonly currency: string

  constructor(amount: number, currency: string) {
    const dollarUS = Intl.NumberFormat(Money.locales[`${currency}`.toUpperCase()] ?? 'en-US', {
      style: 'currency',
      currency
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

  plus(vo: Money) {
    return new Money(this.amount + vo.amount, this.currency)
  }
}
