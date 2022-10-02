// .test.ts
import '@/tests/apps/mooc/backend/dependency-injection'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

const repository: CourseRepository = container.resolve<CourseRepository>(TYPES.CourseRepository)
const environmentArrange: Promise<EnvironmentArranger> = container.resolve(TYPES.EnvironmentArranger)

beforeEach(async () => {
  await (await environmentArrange).arrange()
})

afterAll(async () => {
  await (await environmentArrange).arrange()
  await (await environmentArrange).close()
})

describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
