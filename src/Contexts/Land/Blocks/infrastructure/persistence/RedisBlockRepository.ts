import { Redis } from 'ioredis'
import { inject, injectable } from 'tsyringe'

import { BlockId } from '@/Contexts/Land/Shared/domain'
import { Nullable } from '@/Contexts/Shared/domain'
import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

import { Block, BlockPrimitiveType, BlockRepository } from '../../domain'

@injectable()
export class RedisBlockRepository implements BlockRepository {
  constructor(@inject(SHARED_TYPES.RedisClient) private readonly client: Redis) {}
  async all(): Promise<Block[]> {
    const stored: any = await this.client.call('JSON.GET', 'blocks')
    const blocks = (JSON.parse(stored) as BlockPrimitiveType[]).map((block) => Block.fromPrimitives(block as any))

    return blocks
  }

  async find(_id: BlockId): Promise<Nullable<Block>> {
    return null
  }
  async save(_block: Block): Promise<void> {
    return
  }

  async delete(_block: Block): Promise<void> {
    return
  }
}
