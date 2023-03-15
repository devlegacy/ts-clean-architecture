import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  // CartModule
  // Domain
  CartRepository: Symbol.for('CartRepository'),
  BlockRepository: Symbol.for('BlockRepository'),
  LotRepository: Symbol.for('LotRepository'),
}
