import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  UserRepository: Symbol.for('UserRepository'),
}
