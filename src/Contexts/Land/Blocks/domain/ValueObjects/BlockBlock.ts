import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BlockBlockLengthExceeded,
} from '../Errors/index.js'

const MAX_CHARACTER_LIMIT = 10

export class BlockBlock extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthLessThanLimit(value)
  }

  private ensureLengthLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new BlockBlockLengthExceeded(
        value,
        MAX_CHARACTER_LIMIT,
      )
    }
  }
}
