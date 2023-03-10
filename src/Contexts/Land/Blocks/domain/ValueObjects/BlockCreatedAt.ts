import { DateTime } from '@/Contexts/Shared/domain'

export class BlockCreatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
