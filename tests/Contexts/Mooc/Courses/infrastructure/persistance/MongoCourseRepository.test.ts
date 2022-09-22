// .test.ts
import '@/apps/mooc/backend/dependency-injection/index'

import { MongoClient } from 'mongodb'
import { container } from 'tsyringe'

import { CourseRepository } from '@/Contexts/Mooc/Courses/domain/CourseRepository'

import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger'
import { MongoEnvironmentArranger } from '../../../../Shared/infrastructure/mongo/MongoEnvironmentArranger'
import { CourseMother } from '../../domain/CourseMother'

container.register<EnvironmentArranger>('EnvironmentArranger', {
  useValue: new MongoEnvironmentArranger(container.resolve<Promise<MongoClient>>('MongoClient'))
})

const repository: CourseRepository = container.resolve<CourseRepository>('CourseRepository')
const environmentArrange: Promise<EnvironmentArranger> = container.resolve('EnvironmentArranger')

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
