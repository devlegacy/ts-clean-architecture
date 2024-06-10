import {
  NumberValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export class CoursesCounterTotal extends NumberValueObject {
  static initialize(): CoursesCounterTotal {
    return new CoursesCounterTotal(0)
  }

  increment(): CoursesCounterTotal {
    return new CoursesCounterTotal(this.value + 1)
  }
}
