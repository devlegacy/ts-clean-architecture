import { BlockId } from '@/Contexts/Land/Shared/domain'

import { Block, BlockRepository } from '../../domain'

export class ProxyBlockRepository implements BlockRepository {
  constructor(
    private readonly currentRepository: BlockRepository,

    private readonly targetRepository: BlockRepository
  ) {}

  async all(): Promise<Block[]> {
    const blocks = await this.targetRepository.all()

    return blocks
  }

  async find(id: BlockId): Promise<Nullable<Block>> {
    const block = await this.currentRepository.find(id)

    return block
  }

  async save(block: Block): Promise<void> {
    await this.currentRepository.save(block)
  }

  async delete(block: Block): Promise<void> {
    await this.currentRepository.delete(block)
  }
}
