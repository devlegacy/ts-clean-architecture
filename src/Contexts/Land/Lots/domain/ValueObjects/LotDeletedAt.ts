import { DateTime } from '@/Contexts/Shared/domain'

export class LotDeletedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
