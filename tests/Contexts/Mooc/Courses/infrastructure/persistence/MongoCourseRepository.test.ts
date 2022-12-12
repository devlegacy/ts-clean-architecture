import '@/apps/mooc/modules'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

const repository: CourseRepository = container.resolve<CourseRepository>(TYPES.CourseRepository)
const environmentArranger: Promise<EnvironmentArranger> = container.resolve(TYPES.EnvironmentArranger)

beforeEach(async () => {
  const arranger = await environmentArranger
  await arranger.arrange()
})

afterAll(async () => {
  const arranger = await environmentArranger
  await arranger.arrange()
  await arranger.close()
})

// npx cross-env APP_ENV=test jest ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.test.ts
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      expect.assertions(0)

      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
