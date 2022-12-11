import { CartId, UserId } from '@/Contexts/Land/Shared/domain'
import { info } from '@/Contexts/Shared/infrastructure/logger'

export class CartViewCreator {
  // constructor() {}
  async run(id: CartId, userId: UserId) {
    info(`${id} ${userId}`)
  }
}
