import { BackofficeCourse, BackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/domain'
import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

export class BackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  private mockAll = jest.fn()
  private mockSave = jest.fn()
  private courses: BackofficeCourse[] = []

  async searchBy(_criteria: Criteria): Promise<BackofficeCourse[]> {
    return []
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPagination
  ): Promise<{ elements: BackofficeCourse[]; pagination?: Pagination | undefined }> {
    return { elements: [] }
  }

  returnOnSearchAll(courses: BackofficeCourse[]) {
    this.courses = courses
  }

  async all(): Promise<BackofficeCourse[]> {
    this.mockAll()
    return this.courses
  }

  assertSearchAll() {
    expect(this.mockAll).toHaveBeenCalled()
  }

  async save(course: BackofficeCourse): Promise<void> {
    this.mockSave(course)
  }

  assertSaveHasBeenCalledWith(course: BackofficeCourse) {
    expect(this.mockSave).toHaveBeenCalledWith(course)
  }
}
