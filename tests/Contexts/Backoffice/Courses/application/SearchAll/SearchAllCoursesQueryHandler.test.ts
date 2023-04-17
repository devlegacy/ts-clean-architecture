import {
  BackofficeCoursesFinder,
  SearchAllBackofficeCoursesQuery,
  SearchAllBackofficeCoursesQueryHandler,
} from '@/Contexts/Backoffice/Courses/application'

import { BackofficeCourseRepositoryMock } from '../../__mocks__'
import { BackofficeCourseMother, SearchAllCoursesResponseMother } from '../../domain'

describe('SearchAllCourses QueryHandler', () => {
  let repository: BackofficeCourseRepositoryMock

  beforeEach(() => {
    repository = new BackofficeCourseRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random(), BackofficeCourseMother.random()]
    repository.returnOnSearchAll(courses)

    const handler = new SearchAllBackofficeCoursesQueryHandler(new BackofficeCoursesFinder(repository))

    const query = new SearchAllBackofficeCoursesQuery()
    const response = await handler.handle(query)

    repository.assertSearchAll()

    const expected = SearchAllCoursesResponseMother.create(courses)
    expect(expected).toEqual(response)
  })
})
