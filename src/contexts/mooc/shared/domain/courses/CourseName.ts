import { ValueObject } from '@/Contexts/Shared/domain/value-object/ValueObject'

import { CourseNameLengthExceeded } from './CourseNameLengthExceeded'

const MAX_CHARACTER_LIMIT = 30

export class CourseName extends ValueObject<string> {
  constructor(value: string) {
    super(value)

    this.ensureLengthIsLessThanLimit(value)
  }

  private ensureLengthIsLessThanLimit(value: string) {
    if (value.length > MAX_CHARACTER_LIMIT) {
      throw new CourseNameLengthExceeded(`The course name <${value}> has more than ${MAX_CHARACTER_LIMIT} characters`)
    }
  }
}
