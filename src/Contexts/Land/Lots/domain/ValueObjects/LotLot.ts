import { StringValueObject } from '@/Contexts/Shared/domain'

import { LotLotLengthExceeded } from '../Errors'

const MAX_CHARACTER_LIMIT = 4

export class LotLot extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthLessThanLimit(value)
  }

  private ensureLengthLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new LotLotLengthExceeded(value, MAX_CHARACTER_LIMIT)
    }
  }
}
