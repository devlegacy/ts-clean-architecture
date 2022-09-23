// .test.ts
import '@/apps/mooc/backend/dependency-injection/index'

import { MongoClient } from 'mongodb'
import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/backend/dependency-injection/types'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/CourseRepository'
// import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger'
// import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/mongo/MongoEnvironmentArranger'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/arranger/EnvironmentArranger'
import { MongoEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/mongo/MongoEnvironmentArranger'

import { CourseMother } from '../../domain/CourseMother'

container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, {
  useValue: new MongoEnvironmentArranger(container.resolve<Promise<MongoClient>>(TYPES.MongoClient))
})

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
