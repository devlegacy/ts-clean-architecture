import { CourseCreator } from '@/Contexts/Mooc/Courses/application/course.creator'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Shared/domain/courses/CourseNameLengthExceeded'

import { CourseRepositoryMock } from '../__mocks__/course.repository.mock'
import { CourseMother } from '../domain/course.mother'
import { CreateCourseRequestMother } from './create-course-request.mother'

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
