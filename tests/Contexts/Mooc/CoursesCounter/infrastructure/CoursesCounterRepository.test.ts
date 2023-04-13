import { container } from '@/apps/mooc/modules'
import { CoursesCounter, CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CoursesCounterMother } from '../domain'

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
      const savedPreMutation = CoursesCounter.fromPrimitives(expectedCounter.toPrimitives())

      // NOTE: There is a mutation idkw why?
      // We only need this line as arrange
      // const expectedCounter = CoursesCounterMother.random();
      await repository.save(expectedCounter)

      const counter = await repository.search()

      expect(savedPreMutation.toPrimitives()).toEqual(counter?.toPrimitives())
      // NOTE:
      // expect(expectedCounter).toEqual(counter)
    })

    it('should not return null if there is no courses counter', async () => {
      expect(await repository.search()).toBeFalsy()
    })
  })
})
