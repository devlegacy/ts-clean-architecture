import { BackofficeCourse, BackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/domain'
import { Criteria, OffsetPagination, Pagination } from '@/Contexts/Shared/domain'

export class BackofficeCourseRepositoryMock implements BackofficeCourseRepository {
  #allMock: jest.Mock<
    ReturnType<typeof BackofficeCourseRepositoryMock.prototype.all>,
    BackofficeCourse[],
    BackofficeCourseRepository
  > = jest.fn()
  #saveMock: jest.Mock<
    ReturnType<typeof BackofficeCourseRepositoryMock.prototype.save>,
    BackofficeCourse[],
    BackofficeCourseRepository
  > = jest.fn()
  #courses: BackofficeCourse[] = []

  async searchBy(_criteria: Criteria): Promise<BackofficeCourse[]> {
    return []
  }

  async delete(_id: BackofficeCourse['id']): Promise<void> {}

  async update(_course: BackofficeCourse): Promise<void> {}

  async count(_criteria: Criteria): Promise<number> {
    return 0
  }

  async paginate(
    _criteria: Criteria,
    _pagination: OffsetPagination
  ): Promise<{ data: BackofficeCourse[]; pagination?: Pagination | undefined }> {
    return { data: [] }
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
