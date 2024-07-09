import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import {
  Course,
  CourseRepository,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  Criteria,
} from '#@/src/Contexts/Shared/domain/index.js'

export class NodeCourseRepositoryMock implements CourseRepository {
  // One var mock for each method
  #saveMock: Mock<typeof NodeCourseRepositoryMock.prototype.save>
  #searchAllMock: Mock<typeof NodeCourseRepositoryMock.prototype.all>
  #courses: Course[] = []

  constructor() {
    this.#saveMock = mock.fn() // Spy - abusamos del termino mock, doblando dependencia
    this.#searchAllMock = mock.fn() // Spy - abusamos del termino mock, doblando dependencia
  }

  returnOnAll(courses: Course[]) {
    this.#courses = courses
  }

  async all(): Promise<Course[]> {
    this.#searchAllMock()
    return this.#courses
  }

  async search(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  async save(course: Course): Promise<void> {
    // register a call to saveMock method
    this.#saveMock(course)
  }

  assertLastSavedCourseIs(expected: Course): void {
    const calls = this.#saveMock.mock.callCount()
    const lastIndex = calls - 1

    const lastCourseSaved = this.#saveMock.mock.calls?.[lastIndex]?.arguments?.[0]

    assert.strictEqual(lastCourseSaved instanceof Course, true)
    assert.deepStrictEqual(lastCourseSaved?.toPrimitives(), expected.toPrimitives())
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    const calls = this.#saveMock.mock.callCount()
    const lastIndex = calls - 1
    // mock
    assert.deepStrictEqual(this.#saveMock.mock.calls?.[lastIndex]?.arguments?.[0], expected)
  }

  assertAll() {
    // toHaveBeenCalled
    assert.strictEqual(this.#searchAllMock.mock.callCount() > 0, true)
  }
}
