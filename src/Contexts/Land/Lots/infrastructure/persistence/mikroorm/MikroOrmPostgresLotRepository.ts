import { EntitySchema } from '@mikro-orm/core'

import { MikroOrmPostgresRepository } from '@/Contexts/Shared/infrastructure'

import { Lot, LotRepository } from '../../../domain'
import { LotEntity } from './postgres/LotEntity'

export class MikroOrmPostgresLotRepository extends MikroOrmPostgresRepository<Lot> implements LotRepository {
  async save(lot: Lot): Promise<void> {
    await this.persist(lot)
  }

  protected entitySchema(): EntitySchema<Lot> {
    return LotEntity
  }
}
