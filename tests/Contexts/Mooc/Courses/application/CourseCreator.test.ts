import { CourseCreator } from '@/Contexts/Mooc/Courses/application'
import { CourseDuration, CourseName, CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

import { EventBusMock } from '../../Shared'
import { CourseRepositoryMock } from '../__mocks__'
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
    expect.assertions(4)
    const request = CreateCourseRequestMother.random()
    const course = CourseMother.fromRequest(request)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)

    // await creator.run(request)
    await creator.run({
      id: new CourseId(request.id),
      name: new CourseName(request.name),
      duration: CourseDuration.create(request.duration),
    })

    repository.assertLastSavedCourseIs(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', async () => {
    await expect(async () => {
      const request = CreateCourseRequestMother.invalidRequest()
      const course = CourseMother.fromRequest(request)
      // await creator.run(request)
      await creator.run({
        id: new CourseId(request.id),
        name: new CourseName(request.name),
        duration: CourseDuration.create(request.duration),
      })
      repository.assertSaveHaveBeenCalledWith(course)
    }).rejects.toThrow(CourseNameLengthExceeded)
  })
})
