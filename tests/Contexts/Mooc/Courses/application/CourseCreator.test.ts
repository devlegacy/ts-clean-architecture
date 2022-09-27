import { CourseCreator } from '@/Contexts/Mooc/Courses/application'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain'

import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../domain'
import { CreateCourseRequestMother } from './CreateCourseRequestMother'

let repository: CourseRepositoryMock
let creator: CourseCreator

beforeEach(() => {
  repository = new CourseRepositoryMock()
  creator = new CourseCreator(repository)
})

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random()
    const course = CourseMother.fromRequest(request)

    await creator.run(request)

    repository.assertLastSavedCourseIs(course)
  })

  it('should throw error if course name length is exceeded', async () => {
    expect(async () => {
      const request = CreateCourseRequestMother.invalidRequest()
      const course = CourseMother.fromRequest(request)
      await creator.run(request)
      repository.assertSaveHaveBeenCalledWith(course)
    }).rejects.toThrow(CourseNameLengthExceeded)
  })
})
