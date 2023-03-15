import { DateTime } from '@/Contexts/Shared/domain'

export class LotCreatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
