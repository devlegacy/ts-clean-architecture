import {
  beforeEach, describe,
} from 'node:test'

import {
  CoursesCounterFinder,
} from '#@/src/Contexts/Mooc/CoursesCounter/application/index.js'
import {
  CoursesCounterNotExist,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

import {
  CoursesCounterRepositoryMock,
} from '../../__mocks__/CoursesCounterRepositoryMock.js'
import {
  CoursesCounterMother,
} from '../../domain/index.js'

describe('CourseCounterFinder', () => {
  let repository: CoursesCounterRepositoryMock

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random()
    repository.returnOnSearch(counter)
    const finder = new CoursesCounterFinder(repository)

    const response = await finder.run()

    repository.assertSearch()
    expect(counter.total.value).toEqual(response)
  })

  it('should throw an exception when courses counter does not exists', async () => {
    const finder = new CoursesCounterFinder(repository)

    await expect(finder.run()).rejects.toBeInstanceOf(CoursesCounterNotExist)
  })
})
