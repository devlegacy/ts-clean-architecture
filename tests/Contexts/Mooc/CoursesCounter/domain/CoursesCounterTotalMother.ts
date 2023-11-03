import { CoursesCounterTotal } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'
import { IntegerMother } from '@/tests/Contexts/Shared/domain/index.js'

export class CoursesCounterTotalMother {
  static random() {
    return new CoursesCounterTotal(IntegerMother.random(20))
  }
}
