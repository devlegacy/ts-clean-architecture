import {
  DateTime,
} from '#@/src/Contexts/Shared/domain/index.js'

export class LotCreatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
