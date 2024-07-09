import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import {
  BackofficeCourse,
  BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  Criteria,
  OffsetPaginator,
  type Pagination,
} from '#@/src/Contexts/Shared/domain/index.js'

export class NodeBackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  #allMock: Mock<typeof NodeBackofficeCourseRepositoryMock.prototype.all> = mock.fn()
  #saveMock: Mock<typeof NodeBackofficeCourseRepositoryMock.prototype.save> = mock.fn()
  #courses: BackofficeCourse[] = []

  async search(_criteria: Criteria): Promise<BackofficeCourse[]> {
    return []
  }

  async delete(_id: BackofficeCourse['id']): Promise<void> {}

  async update(_course: BackofficeCourse): Promise<void> {}

  async count(_criteria: Criteria): Promise<number> {
    return 0
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPaginator,
  ): Promise<{ data: BackofficeCourse[], pagination?: Pagination | undefined }> {
    return {
      data: [],
    }
  }

  returnOnSearchAll(courses: BackofficeCourse[]) {
    this.#courses = courses
  }

  async all(): Promise<BackofficeCourse[]> {
    this.#allMock()
    return this.#courses
  }

  assertSearchAll() {
    assert.strictEqual(this.#allMock.mock.callCount() > 0, true)
  }

  async save(course: BackofficeCourse): Promise<void> {
    this.#saveMock(course)
  }

  assertSaveHasBeenCalledWith(course: BackofficeCourse) {
    const calledWith = this.#saveMock.mock.calls.some((call) => call.arguments[0] === course)
    assert.strictEqual(calledWith, true, 'Expected saveMock to have been called with the provided course')
  }
}
