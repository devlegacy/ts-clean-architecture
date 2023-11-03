import { container } from '@/apps/mooc/modules/index.js'
import { CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain/index.js'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/index.js'

import { CoursesCounterMother } from '../domain/index.js'

const repository: CoursesCounterRepository = container.get(CoursesCounterRepository)
const environmentArranger: EnvironmentArranger = container.get(EnvironmentArranger)

jest.setTimeout(5000 + 600000)

beforeEach(async () => {
  await environmentArranger.arrange()
})

afterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()
})

describe('CoursesCounterRepository', () => {
  describe('#save', () => {
    it('should save a courses counter', async () => {
      expect.assertions(0)

      const course = CoursesCounterMother.random()

      await repository.save(course)
    })
  })

  describe('#search', () => {
    it('should return an existing course', async () => {
      const expectedCounter = CoursesCounterMother.random()
      await repository.save(expectedCounter)

      const counter = await repository.search()

      expect(expectedCounter.toPrimitives()).toEqual(counter?.toPrimitives())
    })

    it('should not return null if there is no courses counter', async () => {
      const search = await repository.search()
      expect(search).toBeFalsy()
    })
  })
})
