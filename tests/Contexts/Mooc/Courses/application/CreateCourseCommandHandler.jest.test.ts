import { CourseCreator, CreateCourseCommandHandler } from '@/Contexts/Mooc/Courses/application/index.js'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain/index.js'

import { JestEventBusMock } from '../../Shared/JestEventBusMock.js'
import { JestCourseRepositoryMock } from '../__mocks__/JestCourseRepositoryMock.js'
import { CourseCreatedDomainEventMother, CourseMother } from '../domain/index.js'
import { CreateCourseCommandMother } from './CreateCourseCommandMother.js'

let repository: JestCourseRepositoryMock
let creator: CourseCreator
let eventBus: JestEventBusMock
let handler: CreateCourseCommandHandler

beforeEach(() => {
  repository = new JestCourseRepositoryMock()
  eventBus = new JestEventBusMock()
  creator = new CourseCreator(repository, eventBus)
  handler = new CreateCourseCommandHandler(creator)
})

describe('CreateCourseCommandHandler', () => {
  it('should create a valid course', async () => {
    expect.assertions(5)

    const command = CreateCourseCommandMother.random()
    const course = CourseMother.from(command)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)

    await handler.handle(command)

    repository.assertLastSavedCourseIs(course)
    repository.assertSaveHaveBeenCalledWith(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', async () => {
    const command = CreateCourseCommandMother.invalid()

    await expect(async () => {
      const course = CourseMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(course)
    }).rejects.toThrow(CourseNameLengthExceeded)
  })
})
