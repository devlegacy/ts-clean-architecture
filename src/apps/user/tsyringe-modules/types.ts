import { SHARED_TYPES } from '@/Contexts/Shared/domain/index.js'

export const TYPES = {
  ...SHARED_TYPES,
  UserRepository: Symbol.for('UserRepository'),
}
