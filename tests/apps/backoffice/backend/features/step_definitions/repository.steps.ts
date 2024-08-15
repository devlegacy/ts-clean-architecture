import {
  Given,
} from '@cucumber/cucumber'

import {
  container,
} from '#@/src/apps/backoffice/modules/index.js'
import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseName,
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'

const courseRepository: BackofficeCourseRepository = container.get(BackofficeCourseRepository)

Given('there is the course:', async (course: any) => {
  const {
    id,
    name,
    duration,
  } = JSON.parse(course)

  const backofficeCourse = new BackofficeCourse(
    new CourseId(id),
    new BackofficeCourseName(name),
    new BackofficeCourseDuration(duration),
  )

  await courseRepository.save(backofficeCourse)
})
