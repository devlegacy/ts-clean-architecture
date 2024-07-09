import {
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals'

import {
  BackofficeCoursesFinder,
  SearchAllBackofficeCoursesQuery,
  SearchAllBackofficeCoursesQueryHandler,
} from '#@/src/Contexts/Backoffice/Courses/application/index.js'

import {
  JestBackofficeCourseRepositoryMock,
} from '../../__mocks__/JestBackofficeCourseRepositoryMock.js'
import {
  BackofficeCourseMother,
  SearchAllCoursesResponseMother,
} from '../../domain/index.js'

describe('SearchAllCourses QueryHandler', () => {
  let repository: JestBackofficeCourseRepositoryMock

  beforeEach(() => {
    repository = new JestBackofficeCourseRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const courses = [
      BackofficeCourseMother.random(),
      BackofficeCourseMother.random(),
      BackofficeCourseMother.random(),
    ]
    repository.returnOnSearchAll(courses)

    const handler = new SearchAllBackofficeCoursesQueryHandler(new BackofficeCoursesFinder(repository))

    const query = new SearchAllBackofficeCoursesQuery()
    const response = await handler.handle(query)

    repository.assertSearchAll()

    const expected = SearchAllCoursesResponseMother.create(courses)
    expect(expected).toEqual(response)
  })
})
