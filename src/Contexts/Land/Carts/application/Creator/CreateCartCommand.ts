import { Command } from '@/Contexts/Shared/domain/index.js'

import type { CartPrimitiveType } from '../../domain/index.js'

type Params = Omit<CartPrimitiveType, 'checkout'>

export class CreateCartCommand extends Command {
  readonly id: string
  readonly userId: string

  constructor({ id, userId }: Params) {
    super()
    this.id = id
    this.userId = userId
  }
}
