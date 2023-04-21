import { CartId } from '@/Contexts/Land/Shared/domain'
import { EntityNotFoundError } from '@/Contexts/Shared/domain'

import { Cart, CartRepository } from '../../domain'

export class CartFinder {
  constructor(private readonly repository: CartRepository) {}

  async run(id: CartId): Promise<Cart> {
    const cart = await this.repository.find(id)
    if (!cart) throw new EntityNotFoundError('Cart not found')

    return cart
  }
}
