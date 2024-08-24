import {
  DateTime,
} from '#@/src/Contexts/Shared/domain/index.js'

export class LotDeletedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
