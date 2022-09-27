// import { Uuid } from '@/Contexts/Shared/domain/value-object/Uuid'

import { ObjectId } from 'mongodb'

import { Course, CourseDuration, CourseName } from '@/Contexts/Mooc/Courses/domain'
import { FileCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure'
import { CourseId } from '@/Contexts/Mooc/Shared/domain'

describe('File Course Repository', () => {
  it('should save a course', async () => {
    // const id = new CourseId('be1a2a91-d1cc-4793-b691-fb92ba7fb1cf')
    const id = new CourseId(new ObjectId().toString())
    const expectedCourse = new Course(id, new CourseName('name'), new CourseDuration('duration'))
    const repository = new FileCourseRepository()

    await repository.save(expectedCourse)

    const course = await repository.search(id.value)
    expect(course).toEqual(expectedCourse)
  })
})
