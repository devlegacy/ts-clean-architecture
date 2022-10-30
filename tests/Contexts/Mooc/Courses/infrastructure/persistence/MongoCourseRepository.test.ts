// .test.ts
import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

const repository: CourseRepository = container.resolve<CourseRepository>(TYPES.CourseRepository)
const environmentArranger: Promise<EnvironmentArranger> = container.resolve(TYPES.EnvironmentArranger)

beforeEach(async () => {
  await (await environmentArranger).arrange()
})

afterAll(async () => {
  await (await environmentArranger).arrange()
  await (await environmentArranger).close()
})

describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
