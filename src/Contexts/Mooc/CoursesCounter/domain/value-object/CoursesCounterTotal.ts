import { NumberValueObject } from '@/Contexts/Shared/domain'

export class CoursesCounterTotal extends NumberValueObject {
  static initialize(): CoursesCounterTotal {
    return new CoursesCounterTotal(0)
  }

  increment(): CoursesCounterTotal {
    return new CoursesCounterTotal(this.value + 1)
  }
}
