// npx cross-env APP_ENV=test node --test --loader=ts-paths-esm-loader/transpile-only ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.test.ts
import 'reflect-metadata'

import { afterEach, beforeEach, describe, it } from 'node:test'

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

// afterAll(async () => {
//   await arranger.arrange()
//   await arranger.close()
// })

afterEach(async () => {
  await arranger.arrange()
  await arranger.close()
})

// process.on('exit', async () => {
//   console.log('exit')
//   await arranger.arrange()
//   await arranger.close()
// })

// npx cross-env APP_ENV=test jest ./tests/Contexts/Mooc/Courses/infrastructure/persistence/MongoCourseRepository.test.ts
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should save a course', async () => {
      // no news (errors!) then good news
      const course = CourseMother.random()
      await repository.save(course)
    })
  })
})
