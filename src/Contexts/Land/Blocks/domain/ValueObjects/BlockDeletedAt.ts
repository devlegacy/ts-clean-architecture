import { DateTime } from '@/Contexts/Shared/domain'

export class BlockDeletedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
