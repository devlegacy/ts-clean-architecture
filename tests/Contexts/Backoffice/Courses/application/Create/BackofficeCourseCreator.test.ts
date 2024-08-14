import {
  BackofficeCourseCreator,
} from '#@/src/Contexts/Backoffice/Courses/application/index.js'

import {
  BackofficeCourseRepositoryMock,
} from '../../__mocks__/BackofficeCourseRepositoryMock.js'
import {
  BackofficeCourseMother,
} from '../../domain/index.js'

describe('BackofficeCourseCreator', () => {
  it('creates a backoffice course', async () => {
    expect.assertions(1)

    const course = BackofficeCourseMother.random()

    const repository = new BackofficeCourseRepositoryMock()
    const applicationService = new BackofficeCourseCreator(repository)

    await applicationService.run({
      id: course.id,
      name: course.name,
      duration: course?.duration,
      createdAt: course?.createdAt,
      updatedAt: course?.updatedAt,
      // course?.deletedAt
    })

    repository.assertSaveHasBeenCalledWith(course)
  })
})
