import {
  expect,
  jest,
} from '@jest/globals'
import type {
  Mock,
} from 'jest-mock'

import {
  CoursesCounter,
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

export class JestCoursesCounterRepositoryMock implements CoursesCounterRepository {
  #saveMock: Mock<typeof JestCoursesCounterRepositoryMock.prototype.save> = jest.fn()
  #searchMock: Mock<typeof JestCoursesCounterRepositoryMock.prototype.search> = jest.fn()
  #coursesCounter: Nullable<CoursesCounter> = null

  async search(): Promise<Nullable<CoursesCounter>> {
    this.#searchMock()
    return this.#coursesCounter
  }

  async save(counter: CoursesCounter): Promise<void> {
    this.#saveMock(counter)
  }

  returnOnSearch(counter: CoursesCounter) {
    this.#coursesCounter = counter
  }

  assertSearch() {
    expect(this.#searchMock).toHaveBeenCalled()
  }

  assertNotSave() {
    expect(this.#saveMock).toHaveBeenCalledTimes(0)
  }

  assertLastCoursesCounterSaved(counter: CoursesCounter) {
    const {
      mock: {
        calls,
      },
    } = this.#saveMock
    const lastIndex = calls.length - 1

    const [
      lastCoursesCounter,
    ] = calls[Number(lastIndex)]!
    const {
      id: _firstId, ...counterPrimitives
    } = counter.toPrimitives()
    const {
      id: _secondId, ...lastSavedPrimitives
    } = lastCoursesCounter?.toPrimitives() || {}

    expect(lastCoursesCounter).toBeInstanceOf(CoursesCounter)
    expect(lastSavedPrimitives).toEqual(counterPrimitives)
  }
}
