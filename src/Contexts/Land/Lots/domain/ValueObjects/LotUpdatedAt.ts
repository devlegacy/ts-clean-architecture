import {
  DateTime,
} from '#@/src/Contexts/Shared/domain/index.js'

export class LotUpdatedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
