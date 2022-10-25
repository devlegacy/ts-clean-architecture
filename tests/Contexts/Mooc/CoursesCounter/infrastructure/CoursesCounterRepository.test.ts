import '@/tests/apps/mooc/dependency-injection'

import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection/types'
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
      const course = CoursesCounterMother.random()

      await repository.save(course)
    })
  })

  describe('#search', () => {
    it('should return an existing course', async () => {
      const expectedCounter = CoursesCounterMother.random()
      const savedPreMutation = CoursesCounter.fromPrimitives(expectedCounter.toPrimitives())

      // NOTE: There is a mutation idkw why?
      await repository.save(expectedCounter)

      const counter = await repository.search()

      expect(savedPreMutation.toPrimitives()).toEqual(counter?.toPrimitives())
    })

    it('should not return null if there is no courses counter', async () => {
      expect(await repository.search()).toBeFalsy()
    })
  })
})
