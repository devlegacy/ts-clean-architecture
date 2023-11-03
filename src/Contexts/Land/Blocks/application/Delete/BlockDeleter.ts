import { BlockId } from '@/Contexts/Land/Shared/domain/index.js'
import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { EntityNotFoundError, EventBus } from '@/Contexts/Shared/domain/index.js'

import { BlockRepository } from '../../domain/index.js'

@UseCase()
export class BlockDeleter {
  constructor(
    private readonly repository: BlockRepository,
    private readonly bus: EventBus
  ) {}

  async run(request: BlockId) {
    const block = await this.repository.find(request)
    if (!block) throw new EntityNotFoundError('Block not found')

    block.remove()

    await this.repository.delete(block)
    await this.bus.publish(block.pullDomainEvents())
  }
}
