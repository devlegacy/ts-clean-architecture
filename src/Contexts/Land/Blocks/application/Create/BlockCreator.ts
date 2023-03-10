import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'

import { Block, BlockEntityDto, BlockRepository } from '../../domain'

@injectable()
export class BlockCreator {
  constructor(@inject(TYPES.BlockRepository) private readonly repository: BlockRepository) {}

  async run(request: BlockEntityDto) {
    const block = Block.create(request)
    // block.pullDomainEvents()

    await this.repository.save(block)
  }
}
