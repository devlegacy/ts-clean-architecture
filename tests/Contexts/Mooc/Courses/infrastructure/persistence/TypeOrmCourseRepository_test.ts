import '@/apps/mooc/backend/dependency-injection/index'

import { container } from 'tsyringe'
import { DataSource } from 'typeorm'

import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import { EnvironmentArranger, TypeOrmEnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

container.register<EnvironmentArranger>('EnvironmentArranger', {
  useValue: new TypeOrmEnvironmentArranger(container.resolve<Promise<DataSource>>('TypeOrmClient'))
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

// describe.skip('CourseRepository', () => {
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      const course = CourseMother.random()

      await repository.save(course)
    })
  })
})
