import '@/apps/mooc/modules'

import { container } from 'tsyringe'

// import { DataSource } from 'typeorm'
import { CourseRepository } from '@/Contexts/Mooc/Courses/domain'
import {
  EnvironmentArranger
  //  TypeOrmEnvironmentArranger
} from '@/tests/Contexts/Shared/infrastructure'

import { CourseMother } from '../../domain'

// container.register<EnvironmentArranger>('EnvironmentArranger', {
//   useValue: new TypeOrmEnvironmentArranger(container.resolve<Promise<DataSource>>('TypeOrmClient'))
// })

const repository: CourseRepository = container.resolve<CourseRepository>('CourseRepository')
const environmentArranger: Promise<EnvironmentArranger> = container.resolve('EnvironmentArranger')

beforeEach(async () => {
  const arranger = await environmentArranger
  await arranger.arrange()
})

afterAll(async () => {
  const arranger = await environmentArranger
  await arranger.arrange()
  await arranger.close()
})

// - describe.skip('CourseRepository', () => {
describe('CourseRepository', () => {
  describe('#save', () => {
    it('should have a course', async () => {
      expect.assertions(0)
      const course = CourseMother.random()

      await repository.save(course)
    })
  })
})
