import {
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals'

import {
  CoursesCounterFinder,
  FindCoursesCounterQuery,
  FindCoursesCounterQueryHandler,
} from '#@/src/Contexts/Mooc/CoursesCounter/application/index.js'
import {
  CoursesCounterNotExist,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

import {
  JestCoursesCounterRepositoryMock,
} from '../../__mocks__/JestCoursesCounterRepositoryMock.js'
import {
  CoursesCounterMother,
} from '../../domain/index.js'

describe('FindCoursesCounterQueryHandler', () => {
  let repository: JestCoursesCounterRepositoryMock

  beforeEach(() => {
    repository = new JestCoursesCounterRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random()
    repository.returnOnSearch(counter)
    const finder = new CoursesCounterFinder(repository)
    const handler = new FindCoursesCounterQueryHandler(finder)

    const response = await handler.handle(new FindCoursesCounterQuery())

    repository.assertSearch()
    expect(counter.total.value).toEqual(response.total)
  })

  it('should throw an exception when courses counter does not exists', async () => {
    const finder = new CoursesCounterFinder(repository)
    const handler = new FindCoursesCounterQueryHandler(finder)

    await expect(handler.handle(new FindCoursesCounterQuery())).rejects.toBeInstanceOf(CoursesCounterNotExist)
  })
})
