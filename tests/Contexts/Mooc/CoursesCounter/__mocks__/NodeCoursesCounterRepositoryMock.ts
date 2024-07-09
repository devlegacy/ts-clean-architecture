import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import {
  CoursesCounter,
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

export class NodeCoursesCounterRepositoryMock implements CoursesCounterRepository {
  #saveMock: Mock<typeof NodeCoursesCounterRepositoryMock.prototype.save> = mock.fn()
  #searchMock: Mock<typeof NodeCoursesCounterRepositoryMock.prototype.search> = mock.fn()
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
    assert.strictEqual(this.#searchMock.mock.callCount() > 0, true)
  }

  assertNotSave() {
    assert.strictEqual(this.#saveMock.mock.callCount(), 0)
  }

  assertLastCoursesCounterSaved(counter: CoursesCounter) {
    const calls = this.#saveMock.mock.callCount()

    const lastIndex = calls - 1

    const lastCoursesCounter = this.#saveMock.mock.calls?.[lastIndex]?.arguments?.[0] as CoursesCounter
    const {
      id: _firstId, ...counterPrimitives
    } = counter.toPrimitives()
    const {
      id: _secondId, ...lastSavedPrimitives
    } = lastCoursesCounter?.toPrimitives() || {}

    assert.strictEqual(lastCoursesCounter instanceof CoursesCounter, true)
    assert.deepStrictEqual(lastSavedPrimitives, counterPrimitives)
  }
}
