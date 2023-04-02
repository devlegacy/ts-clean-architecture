import { inject, injectable } from 'tsyringe'

import { TYPES } from '@/apps/land/modules/types'
import { BlockId } from '@/Contexts/Land/Shared/domain'
import { Nullable } from '@/Contexts/Shared/domain'

import { Block, BlockRepository } from '../../domain'

@injectable()
export class ProxyBlockRepository implements BlockRepository {
  constructor(
    @inject(TYPES.MikroOrmPostgresBlockRepository)
    private readonly currentRepository: BlockRepository,
    @inject(TYPES.RedisBlockRepository) private readonly _targetRepository: BlockRepository
  ) {}

  async all(): Promise<Block[]> {
    const blocks = await this.currentRepository.all()

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
