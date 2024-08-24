import {
  DateTime,
} from '#@/src/Contexts/Shared/domain/index.js'

export class BlockDeletedAt extends DateTime {
  constructor(value: Date) {
    super(value)
  }
}
