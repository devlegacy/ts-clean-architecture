import { container } from '@/apps/mooc/modules'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

const repository = container.get(CourseRepository)
const environmentArranger = container.get(EnvironmentArranger)

beforeEach(async () => {
  const arranger = environmentArranger
  await arranger.arrange()
})

afterAll(async () => {
  const arranger = environmentArranger
  await arranger.arrange()
  await arranger.close()
})

// npx cross-env APP_ENV=test jest ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.test.ts
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      expect.assertions(0)

      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
