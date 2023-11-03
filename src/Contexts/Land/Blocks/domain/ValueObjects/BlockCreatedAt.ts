import { DateTime } from '@/Contexts/Shared/domain/index.js'

export class BlockCreatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
