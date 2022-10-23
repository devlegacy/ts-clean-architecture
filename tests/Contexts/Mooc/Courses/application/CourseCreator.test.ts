import { CourseCreator } from '@/Contexts/Mooc/Courses/application'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain'

import { CourseRepositoryMock, EventBusMock } from '../__mocks__'
import { CourseCreatedDomainEventMother, CourseMother } from '../domain'
import { CreateCourseRequestMother } from './CreateCourseRequestMother'

let repository: CourseRepositoryMock
let creator: CourseCreator
let eventBus: EventBusMock

beforeEach(() => {
  repository = new CourseRepositoryMock()
  eventBus = new EventBusMock()
  creator = new CourseCreator(repository, eventBus)
})

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random()
    const course = CourseMother.fromRequest(request)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)

    await creator.run(request)

    repository.assertLastSavedCourseIs(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', () => {
    expect(async () => {
      const request = CreateCourseRequestMother.invalidRequest()
      const course = CourseMother.fromRequest(request)
      await creator.run(request)
      repository.assertSaveHaveBeenCalledWith(course)
    }).rejects.toThrow(CourseNameLengthExceeded)
  })
})
