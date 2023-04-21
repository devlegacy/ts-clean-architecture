import { BlockId } from '@/Contexts/Land/Shared/domain'
import { EntityNotFoundError, EventBus } from '@/Contexts/Shared/domain'

import { BlockRepository } from '../../domain'

export class BlockDeleter {
  constructor(private readonly repository: BlockRepository, private readonly bus: EventBus) {}

  async run(request: BlockId) {
    const block = await this.repository.find(request)
    if (!block) throw new EntityNotFoundError('Block not found')

    block.remove()

    await this.repository.delete(block)
    await this.bus.publish(block.pullDomainEvents())
  }
}
