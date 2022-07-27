import { Course } from '@/contexts/mooc/courses/domain/course'
import { FileCourseRepository } from '@/contexts/mooc/courses/infrastructure/persistance/file-course.repository'
import { CourseDuration } from '@/contexts/mooc/shared/domain/courses/course-duration'
import { CourseId } from '@/contexts/mooc/shared/domain/courses/course-id'
import { CourseName } from '@/contexts/mooc/shared/domain/courses/course-name'
// import { Uuid } from '@/contexts/shared/domain/value-object/uuid'

describe('File Course Repository', () => {
  it('should save a course', async () => {
    const id = new CourseId('be1a2a91-d1cc-4793-b691-fb92ba7fb1cf')
    const expectedCourse = new Course(id, new CourseName('name'), new CourseDuration('duration'))
    const repository = new FileCourseRepository()

    await repository.save(expectedCourse)

    const course = await repository.search(id.value)
    expect(course).toEqual(expectedCourse)
  })
})
