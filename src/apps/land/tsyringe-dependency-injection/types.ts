import { SHARED_TYPES } from '@/Contexts/Shared/domain'

export const TYPES = {
  ...SHARED_TYPES,
  // CartModule
  // Domain
  CartRepository: Symbol.for('CartRepository'),
  RedisBlockRepository: Symbol.for('RedisBlockRepository'),
  MikroOrmPostgresBlockRepository: Symbol.for('MikroOrmPostgresBlockRepository'),
  BlockRepository: Symbol.for('BlockRepository'),
  LotRepository: Symbol.for('LotRepository'),
}
