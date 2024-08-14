import {
  SHARED_TYPES,
} from '#@/src/Contexts/Shared/domain/index.js'

export const TYPES = {
  ...SHARED_TYPES,
  UserRepository: Symbol.for('UserRepository'),
}
