import { EntitySchema } from '@mikro-orm/core'

import { MikroOrmPostgresRepository } from '@/Contexts/Shared/infrastructure'

import { Block, BlockRepository } from '../../domain'
import { BlockEntity } from './mikroorm/postgres/BlockEntity'

export class MikroOrmPostgresBlockRepository extends MikroOrmPostgresRepository<Block> implements BlockRepository {
  async all(): Promise<Block[]> {
    const repository = await this.repository()
    const blocks = await repository.findAll()

    return blocks
  }

  async find(id: Block['id']): Promise<Nullable<Block>> {
    const repository = await this.repository()
    const block = await repository.findOne({ id })

    if (!block) return null

    return block
  }

  async save(block: Block): Promise<void> {
    await this.persist(block)
  }

  async delete(block: Block): Promise<void> {
    await this.persist(block)
  }

  protected entitySchema(): EntitySchema<Block> {
    return BlockEntity
  }
}
