import { CoursesCounter, CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { Nullable } from '@/Contexts/Shared/domain'

export class CoursesCounterRepositoryMock implements CoursesCounterRepository {
  #saveMock: jest.Mock<
    ReturnType<typeof CoursesCounterRepositoryMock.prototype.save>,
    CoursesCounter[],
    CoursesCounterRepositoryMock
  > = jest.fn()
  #searchMock: jest.Mock<
    ReturnType<typeof CoursesCounterRepositoryMock.prototype.search>,
    CoursesCounter[],
    CoursesCounterRepositoryMock
  > = jest.fn()
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

    const [lastCoursesCounter] = calls[Number(lastIndex)]
    const { id: _firstId, ...counterPrimitives } = counter.toPrimitives()
    const { id: _secondId, ...lastSavedPrimitives } = lastCoursesCounter.toPrimitives()

    expect(lastCoursesCounter).toBeInstanceOf(CoursesCounter)
    expect(lastSavedPrimitives).toEqual(counterPrimitives)
  }
}
