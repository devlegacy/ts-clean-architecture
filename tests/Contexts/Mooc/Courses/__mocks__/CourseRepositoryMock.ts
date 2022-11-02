import { Course, CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { Criteria } from '@/Contexts/Shared/domain'

export class CourseRepositoryMock implements CourseRepository {
  private saveMock: jest.Mock
  private searchAllMock: jest.Mock
  private courses: Course[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchAllMock = jest.fn()
  }

  returnOnAll(courses: Course[]) {
    this.courses = courses
  }

  async all(): Promise<Course[]> {
    this.searchAllMock()
    return this.courses
  }

  async searchBy(_criteria: Criteria): Promise<Course[]> {
    return []
  }

  async save(course: Course): Promise<void> {
    this.saveMock(course)
  }

  assertLastSavedCourseIs(expected: Course): void {
    const { mock } = this.saveMock
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as Course
    expect(lastSavedCourse).toBeInstanceOf(Course)
    expect(lastSavedCourse.toPrimitives()).toEqual(expected.toPrimitives())
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected)
  }

  assertAll() {
    expect(this.searchAllMock).toHaveBeenCalled()
  }
}
