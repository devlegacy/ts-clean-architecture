import '@/apps/mooc/modules'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/modules/types'
import { CoursesCounter, CoursesCounterRepository } from '@/Contexts/Mooc/CoursesCounter/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

import { CoursesCounterMother } from '../domain'

const repository: CoursesCounterRepository = container.resolve<CoursesCounterRepository>(TYPES.CoursesCounterRepository)
const environmentArranger: Promise<EnvironmentArranger> = container.resolve(TYPES.EnvironmentArranger)

jest.setTimeout(5000 + 600000)

beforeEach(async () => {
  await (await environmentArranger).arrange()
})

afterAll(async () => {
  await (await environmentArranger).arrange()
  await (await environmentArranger).close()
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
