import { DateTime } from '@/Contexts/Shared/domain'

export class BlockUpdatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
