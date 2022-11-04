import { CoursesCounterIncrementer } from '@/Contexts/Mooc/CoursesCounter/application'
import { CoursesCounter } from '@/Contexts/Mooc/CoursesCounter/domain'

import { CourseIdMother } from '../../../Shared/domain/Courses'
import EventBusMock from '../../../Shared/EventBusMock'
import { CoursesCounterRepositoryMock } from '../../__mocks__'
import { CoursesCounterIncrementedDomainEventMother, CoursesCounterMother } from '../../domain'

// eslint-disable-next-line max-lines-per-function
describe('CoursesCounter Incrementer', () => {
  let incrementer: CoursesCounterIncrementer
  let eventBus: EventBusMock
  let repository: CoursesCounterRepositoryMock

  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CoursesCounterRepositoryMock()
    incrementer = new CoursesCounterIncrementer(repository, eventBus)
  })

  it('should initialize a new counter', async () => {
    const courseId = CourseIdMother.random()
    const counter = CoursesCounterMother.withOne(courseId)

    await incrementer.run(courseId)

    repository.assertLastCoursesCounterSaved(counter)
  })

  it('should increment an existing counter', async () => {
    const existingCounter = CoursesCounterMother.random()
    repository.returnOnSearch(existingCounter)
    const courseId = CourseIdMother.random()
    const expected = CoursesCounter.fromPrimitives(existingCounter.toPrimitives())
    expected.increment(courseId)
    const expectedEvent = CoursesCounterIncrementedDomainEventMother.fromCourseCounter(expected)

    await incrementer.run(courseId)

    repository.assertLastCoursesCounterSaved(expected)
    eventBus.assertLastPublishedEventIs(expectedEvent)
  })

  it('should not increment an already incremented counter', async () => {
    const existingCounter = CoursesCounterMother.random()
    repository.returnOnSearch(existingCounter)
    const [courseId] = existingCounter.existingCourses

    await incrementer.run(courseId)

    repository.assertNotSave()
  })
})
