import { StringValueObject } from '@/Contexts/Shared/domain/index.js'

import { BlockStreetLengthExceeded } from '../Errors/index.js'

const MAX_CHARACTER_LIMIT = 100

export class BlockStreet extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureLengthLessThanLimit(value)
  }

  private ensureLengthLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new BlockStreetLengthExceeded(value, MAX_CHARACTER_LIMIT)
    }
  }
}
