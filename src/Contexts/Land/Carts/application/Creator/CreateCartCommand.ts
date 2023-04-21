import { Command } from '@/Contexts/Shared/domain'

import { CartPrimitiveType } from '../../domain'

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
