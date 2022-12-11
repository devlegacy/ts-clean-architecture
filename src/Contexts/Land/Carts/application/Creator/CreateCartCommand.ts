import { Command } from '@/Contexts/Shared/domain'

import { CartPrimitiveDto } from '../../domain'

type Params = Omit<CartPrimitiveDto, 'checkout'>

export class CreateCartCommand extends Command {
  readonly id: string
  readonly userId: string

  constructor({ id, userId }: Params) {
    super()
    this.id = id
    this.userId = userId
  }
}
