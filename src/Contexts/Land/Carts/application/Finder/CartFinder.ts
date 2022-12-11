import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { CartId } from '@/Contexts/Land/Shared/domain'
import { EntityNotFoundException } from '@/Contexts/Shared/domain'

import { Cart, CartRepository } from '../../domain'

@injectable()
export class CartFinder {
  constructor(@inject(TYPES.CartRepository) private readonly repository: CartRepository) {}

  async run(id: CartId): Promise<Cart> {
    const cart = await this.repository.find(id)
    if (!cart) throw new EntityNotFoundException('Cart not found')

    return cart
  }
}
