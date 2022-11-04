import { CoursesCounter, CoursesCounterId, CoursesCounterTotal } from '@/Contexts/Mooc/CoursesCounter/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'
import { Repeater } from '@/tests/Contexts/Shared/domain'

import { CourseIdMother } from '../../Shared/domain/Courses'
import { CoursesCounterTotalMother } from './CoursesCounterTotalMother'

export class CoursesCounterMother {
  static random() {
    const total = CoursesCounterTotalMother.random()
    return new CoursesCounter(
      CoursesCounterId.random(),
      total,
      Repeater.random(CourseIdMother.random.bind(CourseIdMother), total.value)
    )
  }

  static withOne(courseId: CourseId) {
    return new CoursesCounter(CoursesCounterId.random(), new CoursesCounterTotal(1), [courseId])
  }
}
