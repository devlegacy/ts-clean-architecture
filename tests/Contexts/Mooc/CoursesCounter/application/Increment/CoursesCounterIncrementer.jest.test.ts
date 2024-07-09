import {
  beforeEach,
  describe,
  it,
} from '@jest/globals'

import {
  CoursesCounterIncrementer,
} from '#@/src/Contexts/Mooc/CoursesCounter/application/index.js'
import {
  CoursesCounter,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'

import {
  CourseIdMother,
} from '../../../Shared/domain/index.js'
import {
  JestEventBusMock,
} from '../../../Shared/JestEventBusMock.js'
import {
  JestCoursesCounterRepositoryMock,
} from '../../__mocks__/JestCoursesCounterRepositoryMock.js'
import {
  CoursesCounterIncrementedDomainEventMother,
  CoursesCounterMother,
} from '../../domain/index.js'

describe('CoursesCounter Incrementer', () => {
  let incrementer: CoursesCounterIncrementer
  let eventBus: JestEventBusMock
  let repository: JestCoursesCounterRepositoryMock

  beforeEach(() => {
    eventBus = new JestEventBusMock()
    repository = new JestCoursesCounterRepositoryMock()
    incrementer = new CoursesCounterIncrementer(repository, eventBus)
  })

  it('should initialize a new counter', async () => {
    // expect.assertions(2)

    const courseId = CourseIdMother.random()
    const counter = CoursesCounterMother.withOne(courseId)

    await incrementer.run(courseId)

    repository.assertLastCoursesCounterSaved(counter)
  })

  it('should increment an existing counter', async () => {
    // expect.assertions(4)

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
    // expect.assertions(1)

    const existingCounter = CoursesCounterMother.random()
    repository.returnOnSearch(existingCounter)
    const [
      courseId,
    ] = existingCounter.existingCourses

    await incrementer.run(courseId!)

    repository.assertNotSave()
  })
})
