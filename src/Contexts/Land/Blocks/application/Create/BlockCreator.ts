import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'

import { Block, BlockEntityType, BlockRepository } from '../../domain'

@injectable()
export class BlockCreator {
  constructor(
    @inject(TYPES.BlockRepository) private readonly repository: BlockRepository,
    @inject(TYPES.EventBus) private readonly bus: EventBus
  ) {}

  async run(request: BlockEntityType) {
    const block = Block.create(request)

    await this.repository.save(block)
    await this.bus.publish(block.pullDomainEvents())
  }
}
