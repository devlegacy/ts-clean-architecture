import { CoursesCounterTotal } from '@/Contexts/Mooc/CoursesCounter/domain'
import { IntegerMother } from '@/tests/Contexts/Shared/domain'

export class CoursesCounterTotalMother {
  static random() {
    return new CoursesCounterTotal(IntegerMother.random())
  }
}
