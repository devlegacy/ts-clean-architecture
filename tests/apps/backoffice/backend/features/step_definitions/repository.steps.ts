import { Given } from '@cucumber/cucumber'

import { container } from '@/apps/backoffice/modules/index.js'
import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseName,
  BackofficeCourseRepository,
} from '@/Contexts/Backoffice/Courses/domain/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'

const courseRepository: BackofficeCourseRepository = container.get(BackofficeCourseRepository)

Given('there is the course:', async (course: any) => {
  const { id, name, duration } = JSON.parse(course)
  await courseRepository.save(
    new BackofficeCourse(new CourseId(id), new BackofficeCourseName(name), new BackofficeCourseDuration(duration))
  )
})
