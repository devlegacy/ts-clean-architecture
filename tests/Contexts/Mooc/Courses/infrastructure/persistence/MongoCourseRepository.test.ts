import { container } from '@/apps/mooc/modules'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

// Por qué lo importamos a través del inyector?
const repository = container.get(CourseRepository)
const arranger = container.get(EnvironmentArranger)

beforeEach(async () => {
  await arranger.arrange()
})

afterAll(async () => {
  await arranger.arrange()
  await arranger.close()
})

// npx cross-env APP_ENV=test jest ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.test.ts
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      expect.assertions(0)

      // no news (errors!) then good news
      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
