import { EventBus } from '@/Contexts/Shared/domain'
import { UseCase } from '@/Contexts/Shared/domain/Common'

import { Block, BlockEntityType, BlockRepository } from '../../domain'

@UseCase()
export class BlockCreator {
  constructor(private readonly repository: BlockRepository, private readonly bus: EventBus) {}

  async run(request: BlockEntityType) {
    const block = Block.create(request)

    await this.repository.save(block)
    await this.bus.publish(block.pullDomainEvents())
  }
}
