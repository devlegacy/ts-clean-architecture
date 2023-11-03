import { CoursesCounter, CoursesCounterId, CoursesCounterTotal } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'
import { Repeater } from '@/tests/Contexts/Shared/domain/index.js'

import { CourseIdMother } from '../../Shared/domain/Courses/index.js'
import { CoursesCounterTotalMother } from './CoursesCounterTotalMother.js'

export class CoursesCounterMother {
  static random() {
    const total = CoursesCounterTotalMother.random()
    const coursesCounter = new CoursesCounter(
      CoursesCounterId.random(),
      total,
      Repeater.random(CourseIdMother.random.bind(CourseIdMother), total.value)
    )
    return coursesCounter
  }

  static withOne(courseId: CourseId) {
    return new CoursesCounter(CoursesCounterId.random(), new CoursesCounterTotal(1), [courseId])
  }
}
