import { EventBus } from '@/Contexts/Shared/domain'

import { Block, BlockEntityType, BlockRepository } from '../../domain'

export class BlockCreator {
  constructor(private readonly repository: BlockRepository, private readonly bus: EventBus) {}

  async run(request: BlockEntityType) {
    const block = Block.create(request)

    await this.repository.save(block)
    await this.bus.publish(block.pullDomainEvents())
  }
}
