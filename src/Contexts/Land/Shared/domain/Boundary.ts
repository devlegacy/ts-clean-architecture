import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  BoundaryLengthExceeded,
} from './BoundaryLengthExceeded.js'

// [Entity]_[Type]_[PROP]
// export const BOUNDARY_MAX_LENGTH = 160

export const MAXIMUM_BOUNDARY_LENGTH = 160

export class Boundary extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.#ensureLengthIsLessThanLimit(value)
  }

  #ensureLengthIsLessThanLimit(value: string) {
    if (value.length > MAXIMUM_BOUNDARY_LENGTH) {
      throw new BoundaryLengthExceeded(
        value,
        MAXIMUM_BOUNDARY_LENGTH,
      )
    }
  }
}
