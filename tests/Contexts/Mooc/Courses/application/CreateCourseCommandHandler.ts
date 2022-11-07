import { CourseCreator, CreateCourseCommandHandler } from '@/Contexts/Mooc/Courses/application'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain'

import { EventBusMock } from '../../Shared'
import { CourseRepositoryMock } from '../__mocks__'
import { CourseCreatedDomainEventMother, CourseMother } from '../domain'
import { CreateCourseCommandMother } from './CreateCourseCommandMother'

let repository: CourseRepositoryMock
let creator: CourseCreator
let eventBus: EventBusMock
let handler: CreateCourseCommandHandler

beforeEach(() => {
  repository = new CourseRepositoryMock()
  eventBus = new EventBusMock()
  creator = new CourseCreator(repository, eventBus)
  handler = new CreateCourseCommandHandler(creator)
})

describe('CreateCourseCommandHandler', () => {
  it('should create a valid course', async () => {
    expect.assertions(3)

    const command = CreateCourseCommandMother.random()
    const course = CourseMother.from(command)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)

    await handler.handle(command)

    repository.assertSaveHaveBeenCalledWith(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', async () => {
    await expect(async () => {
      const command = CreateCourseCommandMother.invalid()

      const course = CourseMother.from(command)

      await handler.handle(command)

      repository.assertSaveHaveBeenCalledWith(course)
    }).rejects.toThrow(CourseNameLengthExceeded)
  })
})
