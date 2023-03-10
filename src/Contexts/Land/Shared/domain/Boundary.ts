import { StringValueObject } from '@/Contexts/Shared/domain'

import { BoundaryLengthExceeded } from './BoundaryLengthExceeded'

// [Entity]_[Type]_[PROP]
export const BOUNDARY_MAX_LENGTH = 160

export class Boundary extends StringValueObject {
  constructor(value: string) {
    super(value)

    this.isLengthLessThanLimit(value)
  }

  private isLengthLessThanLimit(value: string) {
    if (value.trim().length > BOUNDARY_MAX_LENGTH) {
      throw new BoundaryLengthExceeded(`The course name <${value}> has more than ${BOUNDARY_MAX_LENGTH} characters`)
    }
  }
}
