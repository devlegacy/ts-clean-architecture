import {
  StringValueObject,
  // ValueObject
} from '@/Contexts/Shared/domain'

import { CourseNameLengthExceeded } from '../exceptions'

const MAX_CHARACTER_LIMIT = 30

export class CourseName extends StringValueObject {
  constructor(value: string) {
    super(value)

    // Guard
    this.isLengthLessThanLimit(value)
  }

  // Guard
  private isLengthLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new CourseNameLengthExceeded(`The course name <${value}> has more than ${MAX_CHARACTER_LIMIT} characters`)
    }
  }
}
