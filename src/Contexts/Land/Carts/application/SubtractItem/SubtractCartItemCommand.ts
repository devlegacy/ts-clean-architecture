import { Command } from '@/Contexts/Shared/domain'

type Params = {
  id: string
  itemId: string
  price: number
  currency: string
  quantity: number
}

export class SubtractCartItemCommand extends Command {
  readonly id: string
  readonly itemId: string
  readonly price: number
  readonly currency: string
  readonly quantity: number

  constructor({ id, itemId, price, currency, quantity }: Params) {
    super()
    this.id = id
    this.itemId = itemId
    this.price = price
    this.currency = currency
    this.quantity = quantity
  }
}
