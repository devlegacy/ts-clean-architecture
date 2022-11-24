import { Given } from '@cucumber/cucumber'
import { container } from 'tsyringe'

import { TYPES } from '@/apps/backoffice/modules/types'
import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseName,
  BackofficeCourseRepository
} from '@/Contexts/Backoffice/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

const courseRepository: BackofficeCourseRepository = container.resolve(TYPES.BackofficeCourseRepository)

Given('there is the course:', async (course: any) => {
  const { id, name, duration } = JSON.parse(course)
  await courseRepository.save(
    new BackofficeCourse(new CourseId(id), new BackofficeCourseName(name), new BackofficeCourseDuration(duration))
  )
})
