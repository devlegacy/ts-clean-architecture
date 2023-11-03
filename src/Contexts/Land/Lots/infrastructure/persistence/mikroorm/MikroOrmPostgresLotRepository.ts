import { EntitySchema } from '@mikro-orm/core'

import { MikroOrmPostgresRepository } from '@/Contexts/Shared/infrastructure/index.js'

import { Lot, LotRepository } from '../../../domain/index.js'
import { LotEntity } from './postgres/LotEntity.js'

export class MikroOrmPostgresLotRepository extends MikroOrmPostgresRepository<Lot> implements LotRepository {
  async all(): Promise<Lot[]> {
    const repository = await this.repository()
    const lots = await repository.findAll()

    return lots
  }

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
