import { Service } from 'diod'
import { Redis } from 'ioredis'

import { BlockId } from '@/Contexts/Land/Shared/domain'

import { Block, BlockPrimitiveType, BlockRepository } from '../../domain'

@Service()
export class RedisBlockRepository implements BlockRepository {
  constructor(private readonly client: Redis) {}
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
