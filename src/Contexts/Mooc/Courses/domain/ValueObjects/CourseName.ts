import {
  StringValueObject,
  // ValueObject
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  CourseNameLengthExceeded,
} from '../Errors/index.js'

const MAX_COURSE_NAME_CHARACTER_LIMIT = 30

export class CourseName extends StringValueObject {
  constructor(value: string) {
    super(value)

    // Guard clause
    this.#ensureLengthIsLessThanLimit(value)
  }

  // Guard clause
  #ensureLengthIsLessThanLimit(value: string) {
    if (value.length > MAX_COURSE_NAME_CHARACTER_LIMIT) {
      //  CourseNameLengthExceeded.build`The course name <${value}> has more than ${MAX_COURSE_NAME_CHARACTER_LIMIT} characters`
      throw new CourseNameLengthExceeded(
        `The course name <${value}> has more than ${MAX_COURSE_NAME_CHARACTER_LIMIT} characters`,
      )
    }
  }
}
