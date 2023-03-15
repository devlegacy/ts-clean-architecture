import { DateTime } from '@/Contexts/Shared/domain'

export class LotUpdatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
