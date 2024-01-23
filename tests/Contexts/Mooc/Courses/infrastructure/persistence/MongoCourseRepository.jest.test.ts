import { container } from '@/apps/mooc/modules/index.js'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/index.js'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/index.js'

import { CourseMother } from '../../domain/index.js'

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

// npx cross-env APP_ENV=test MIKRO_ORM_DYNAMIC_IMPORTS=1 NODE_OPTIONS=--experimental-vm-modules --no-warnings=ExperimentalWarning --loader=ts-paths-esm-loader/transpile-only jest --config=./jest.config.mjs ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.jest.test.ts
// npx cross-env APP_ENV=test MIKRO_ORM_DYNAMIC_IMPORTS=1 NODE_OPTIONS=--experimental-vm-modules --no-warnings=ExperimentalWarning --loader=ts-node/esm jest --config=./jest.config.mjs ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.jest.test.ts
// npx cross-env APP_ENV=test NODE_OPTIONS="--experimental-vm-modules --no-warnings=ExperimentalWarning" jest --config=./jest.config.mjs ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.jest.test.ts

// npx cross-env APP_ENV=test NODE_OPTIONS="--experimental-vm-modules --no-warnings=ExperimentalWarning" jest --config=./jest.config.mjs ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.jest.test.ts
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      // no news (errors!) then good news
      const course = CourseMother.random()

      await repository.save(course)
      expect(true).toBeTruthy()
    })
  })
})
