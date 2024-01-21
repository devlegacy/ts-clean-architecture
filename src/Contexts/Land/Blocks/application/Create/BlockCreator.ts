import { UseCase } from '@/Contexts/Shared/domain/Common/index.js'
import { EventBus } from '@/Contexts/Shared/domain/index.js'

import { Block, type BlockEntityType, BlockRepository } from '../../domain/index.js'

@UseCase()
export class BlockCreator {
  constructor(
    private readonly repository: BlockRepository,
    private readonly bus: EventBus,
  ) {}

  async run(request: BlockEntityType) {
    const block = Block.create(request)
    const events = block.pullDomainEvents()
    await this.repository.save(block)
    await this.bus.publish(events)
  }
}
