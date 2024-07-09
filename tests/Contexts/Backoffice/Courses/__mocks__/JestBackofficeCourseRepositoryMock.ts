import {
  expect,
  jest,
} from '@jest/globals'
import type {
  Mock,
} from 'jest-mock'

import {
  BackofficeCourse, BackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  Criteria, OffsetPaginator, type Pagination,
} from '#@/src/Contexts/Shared/domain/index.js'

export class JestBackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  #allMock: Mock<typeof JestBackofficeCourseRepositoryMock.prototype.all> = jest.fn()
  #saveMock: Mock<typeof JestBackofficeCourseRepositoryMock.prototype.save> = jest.fn()
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
    expect(this.#allMock).toHaveBeenCalled()
  }

  async save(course: BackofficeCourse): Promise<void> {
    this.#saveMock(course)
  }

  assertSaveHasBeenCalledWith(course: BackofficeCourse) {
    expect(this.#saveMock).toHaveBeenCalledWith(course)
  }
}
