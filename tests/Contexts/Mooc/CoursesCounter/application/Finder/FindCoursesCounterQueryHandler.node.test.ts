import 'reflect-metadata'

import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  CoursesCounterFinder,
  FindCoursesCounterQuery,
  FindCoursesCounterQueryHandler,
} from '#@/src/Contexts/Mooc/CoursesCounter/application/index.js'
import {
  CoursesCounterNotExist,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

import {
  NodeCoursesCounterRepositoryMock,
} from '../../__mocks__/NodeCoursesCounterRepositoryMock.js'
import {
  CoursesCounterMother,
} from '../../domain/index.js'

describe('FindCoursesCounterQueryHandler', () => {
  let repository: NodeCoursesCounterRepositoryMock

  beforeEach(() => {
    repository = new NodeCoursesCounterRepositoryMock()
  })

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random()
    repository.returnOnSearch(counter)
    const finder = new CoursesCounterFinder(repository)
    const handler = new FindCoursesCounterQueryHandler(finder)

    const response = await handler.handle(new FindCoursesCounterQuery())

    repository.assertSearch()
    // expect(counter.total.value).toEqual(response.total)
    assert.strictEqual(counter.total.value, response.total)
  })

  it('should throw an exception when courses counter does not exists', async () => {
    const finder = new CoursesCounterFinder(repository)
    const handler = new FindCoursesCounterQueryHandler(finder)

    // await expect(handler.handle(new FindCoursesCounterQuery())).rejects.toBeInstanceOf(CoursesCounterNotExist)

    await assert.rejects(handler.handle(new FindCoursesCounterQuery()), CoursesCounterNotExist)
  })
})
