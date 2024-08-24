import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  LotLotLengthExceeded,
} from '../Errors/index.js'

const MAX_CHARACTER_LIMIT = 10

export class LotLot extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthLessThanLimit(value)
  }

  private ensureLengthLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new LotLotLengthExceeded(
        value,
        MAX_CHARACTER_LIMIT,
      )
    }
  }
}
