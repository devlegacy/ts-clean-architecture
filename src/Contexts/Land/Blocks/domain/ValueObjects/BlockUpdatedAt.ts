import { DateTime } from '@/Contexts/Shared/domain/index.js'

export class BlockUpdatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
