import { EntitySchema } from '@mikro-orm/core'

import { Nullable } from '@/Contexts/Shared/domain'
import { MikroOrmPostgresRepository } from '@/Contexts/Shared/infrastructure'

import { Lot, LotRepository } from '../../../domain'
import { LotEntity } from './postgres/LotEntity'

export class MikroOrmPostgresLotRepository extends MikroOrmPostgresRepository<Lot> implements LotRepository {
  async find(id: Lot['id']): Promise<Nullable<Lot>> {
    const repository = await this.repository()
    const lot = await repository.findOne({ id })
    if (!lot) return null

    return lot
  }

  async save(lot: Lot): Promise<void> {
    await this.persist(lot)
  }

  protected entitySchema(): EntitySchema<Lot> {
    return LotEntity
  }
}
