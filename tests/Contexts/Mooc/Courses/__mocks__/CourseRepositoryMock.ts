import { Course, CourseRepository } from '@/Contexts/Mooc/Courses/domain/index.js'
import { Criteria } from '@/Contexts/Shared/domain/index.js'

export class CourseRepositoryMock implements CourseRepository {
  // One var mock for each method
  #saveMock: jest.Mock<ReturnType<typeof CourseRepositoryMock.prototype.save>, Course[], CourseRepositoryMock>
  #searchAllMock: jest.Mock<ReturnType<typeof CourseRepositoryMock.prototype.all>, Course[], CourseRepositoryMock>
  #courses: Course[] = []

  constructor() {
    this.#saveMock = jest.fn() // Spy
    this.#searchAllMock = jest.fn()
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
    const {
      mock: { calls },
    } = this.#saveMock

    const lastIndex = calls.length - 1
    const [lastCourseSaved] = calls[Number(lastIndex)]!
    expect(lastCourseSaved).toBeInstanceOf(Course)
    expect(lastCourseSaved?.toPrimitives()).toEqual(expected.toPrimitives())
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    // mock
    expect(this.#saveMock).toHaveBeenCalledWith(expected)
  }

  assertAll() {
    expect(this.#searchAllMock).toHaveBeenCalled()
  }
}
