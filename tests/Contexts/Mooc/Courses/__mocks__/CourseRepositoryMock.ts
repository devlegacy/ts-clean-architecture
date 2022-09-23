import { Course, CourseRepository } from '@/Contexts/Mooc/Courses/domain'

export class CourseRepositoryMock implements CourseRepository {
  mockSave: jest.Mock
  constructor() {
    this.mockSave = jest.fn()
  }

  async save(course: Course): Promise<void> {
    this.mockSave(course)
  }

  assertLastSavedCourseIs(expected: Course): void {
    const { mock } = this.mockSave
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as Course
    expect(lastSavedCourse).toBeInstanceOf(Course)
    expect(lastSavedCourse.toPrimitives()).toEqual(expected.toPrimitives())
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.mockSave).toHaveBeenCalledWith(expected)
  }
}
