// import { Uuid } from '@/Contexts/Shared/domain/ValueObjects/Uuid'

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { Course, CourseDuration, CourseName } from '@/Contexts/Mooc/Courses/domain/index.js'
import { FileCourseRepository } from '@/Contexts/Mooc/Courses/infrastructure/index.js'
import { CourseId } from '@/Contexts/Mooc/Shared/domain/index.js'

describe('FileCourseRepository', () => {
  it('should save a course', async () => {
    // const id = new CourseId('be1a2a91-d1cc-4793-b691-fb92ba7fb1cf')
    const id = CourseId.random()
    const expectedCourse = new Course(id, new CourseName('name'), new CourseDuration('duration'))
    const repository = new FileCourseRepository()

    // first implicit valid test
    await repository.save(expectedCourse)

    const course = await repository.getById(id.toString())
    assert.deepStrictEqual(course, expectedCourse)
  })
})
