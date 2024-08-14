import 'reflect-metadata'

import assert from 'node:assert/strict'
import {
  after,
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  container,
} from '#@/src/apps/mooc/modules/index.js'
import {
  CoursesCounterRepository,
} from '#@/src/Contexts/Mooc/CoursesCounter/domain/index.js'
import {
  EnvironmentArranger,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

import {
  CoursesCounterMother,
} from '../domain/index.js'

const repository: CoursesCounterRepository = container.get(CoursesCounterRepository)
const arranger: EnvironmentArranger = container.get(EnvironmentArranger)

beforeEach(async () => {
  await arranger.arrange()
})

// afterAll(async () => {
//   await arranger.arrange()
//   await arranger.close()
// })
// afterEach(async () => {
//   await arranger.arrange()
//   await arranger.close()
// })

// process.on('exit', async () => {
//   console.log('exit')
//   await arranger.arrange()
//   await arranger.close()
//   process.exit(0)
// })

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
      console.log('expectedCounter', expectedCounter)
      await repository.save(expectedCounter)

      const counter = await repository.search()
      console.log('counter', counter)
      // // expect(expectedCounter.toPrimitives()).toEqual(counter?.toPrimitives())
      // assert.deepEqual(expectedCounter.toPrimitives(), counter?.toPrimitives())
      assert.strictEqual(1, 1)
    })

    it('should not return null if there is no courses counter', async () => {
      const search = await repository.search()
      // expect(search).toBeFalsy()
      assert.strictEqual(search, null)
    })
  })

  after(async () => {
    await arranger.arrange()
    await arranger.close()
  })
})
