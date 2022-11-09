import { BackofficeCourseCreator } from '@/Contexts/Backoffice/Courses/application'

import { BackofficeCourseRepositoryMock } from '../../__mocks__'
import { BackofficeCourseMother } from '../../domain'

describe('BackofficeCourseCreator', () => {
  it('creates a backoffice course', async () => {
    expect.assertions(1)

    const course = BackofficeCourseMother.random()

    const repository = new BackofficeCourseRepositoryMock()
    const applicationService = new BackofficeCourseCreator(repository)

    await applicationService.run(course.id.toString(), course.name.toString(), course?.duration?.toString())

    repository.assertSaveHasBeenCalledWith(course)
  })
})
