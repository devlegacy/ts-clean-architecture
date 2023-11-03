import { CartId, UserId } from '@/Contexts/Land/Shared/domain/index.js'
import { info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

export class CartViewCreator {
  // constructor() {}
  async run(id: CartId, userId: UserId) {
    info(`${id} ${userId}`)
  }
}
