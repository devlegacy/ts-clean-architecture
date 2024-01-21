import { expect, jest } from '@jest/globals'

import { CoursesCounter, CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'

export class CoursesCounterRepositoryMock implements CoursesCounterRepository {
  #saveMock: jest.Mock = jest.fn()
  #searchMock: jest.Mock = jest.fn()
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
      mock: { calls },
    } = this.#saveMock
    const lastIndex = calls.length - 1

    const [lastCoursesCounter] = calls[Number(lastIndex)]!
    const { id: _firstId, ...counterPrimitives } = counter.toPrimitives()
    // @ts-expect-error error
    const { id: _secondId, ...lastSavedPrimitives } = lastCoursesCounter?.toPrimitives() || {}

    expect(lastCoursesCounter).toBeInstanceOf(CoursesCounter)
    expect(lastSavedPrimitives).toEqual(counterPrimitives)
  }
}
