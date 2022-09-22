import { Course } from '@/Contexts/Mooc/Courses/domain/Course'
import { FileCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure/persistance/FileCourseRepository'
import { CourseDuration } from '@/Contexts/Mooc/Shared/domain/Courses/CourseDuration'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/Courses/CourseId'
import { CourseName } from '@/Contexts/Mooc/Shared/domain/Courses/CourseName'
// import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

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
