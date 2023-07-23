import { SHARED_TYPES } from '@/Contexts/Shared/domain'

export const TYPES = {
  ...SHARED_TYPES,
  UserRepository: Symbol.for('UserRepository'),
}
