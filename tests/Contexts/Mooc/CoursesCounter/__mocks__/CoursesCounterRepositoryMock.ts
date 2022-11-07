import { CoursesCounter, CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { Nullable } from '@/Contexts/Shared/domain'

export class CoursesCounterRepositoryMock implements CoursesCounterRepository {
  private mockSave = jest.fn()
  private mockSearch = jest.fn()
  private coursesCounter: Nullable<CoursesCounter> = null

  async search(): Promise<Nullable<CoursesCounter>> {
    this.mockSearch()
    return this.coursesCounter
  }

  async save(counter: CoursesCounter): Promise<void> {
    this.mockSave(counter)
  }

  returnOnSearch(counter: CoursesCounter) {
    this.coursesCounter = counter
  }

  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled()
  }

  assertNotSave() {
    expect(this.mockSave).toHaveBeenCalledTimes(0)
  }

  assertLastCoursesCounterSaved(counter: CoursesCounter) {
    const { mock } = this.mockSave
    const [lastCoursesCounter] = mock.calls[mock.calls.length - 1] as CoursesCounter[]
    const { id: _firstId, ...counterPrimitives } = counter.toPrimitives()
    const { id: _secondId, ...lastSavedPrimitives } = lastCoursesCounter.toPrimitives()

    expect(lastCoursesCounter).toBeInstanceOf(CoursesCounter)
    expect(lastSavedPrimitives).toEqual(counterPrimitives)
  }
}
