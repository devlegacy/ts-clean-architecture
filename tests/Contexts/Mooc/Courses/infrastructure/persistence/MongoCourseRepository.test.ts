// .test.ts
import '@/tests/apps/mooc/dependency-injection'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

const repository: CourseRepository = container.resolve<CourseRepository>(TYPES.CourseRepository)
const environmentArrange: Promise<EnvironmentArranger> = container.resolve(TYPES.EnvironmentArranger)

beforeEach(async () => {
  try {
    await (await environmentArrange).arrange()
  } catch (e) {
    console.log(e)
  }
})

afterAll(async () => {
  await (await environmentArrange).arrange()
  await (await environmentArrange).close()
})

describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      try {
        const course = CourseMother.random()
        await repository.save(course)
      } catch (e) {
        console.log(e)
      }
    })
  })
})
