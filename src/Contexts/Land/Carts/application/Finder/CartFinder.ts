import {
  CartId,
} from '#@/src/Contexts/Land/Shared/domain/index.js'
import {
  EntityNotFoundError,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  Cart,
  type CartRepository,
} from '../../domain/index.js'

export class CartFinder {
  constructor(private readonly repository: CartRepository) {}

  async run(id: CartId): Promise<Cart> {
    const cart = await this.repository.find(id)
    if (!cart) throw new EntityNotFoundError('Cart not found')

    return cart
  }
}
