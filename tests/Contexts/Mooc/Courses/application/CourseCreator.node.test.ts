// node --test --loader=ts-paths-esm-loader/transpile-only ./tests/Contexts/Mooc/Courses/application/CourseCreator.test.ts
import 'reflect-metadata'

import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  CourseCreator,
} from '#@/src/Contexts/Mooc/Courses/application/index.js'
import {
  CourseDuration,
  CourseName,
  CourseNameLengthExceeded,
} from '#@/src/Contexts/Mooc/Courses/domain/index.js'
import {
  CourseId,
} from '#@/src/Contexts/Mooc/Shared/domain/index.js'
import {
  isUndefined,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  NodeEventBusMock,
} from '../../Shared/NodeEventBusMock.js'
import {
  NodeCourseRepositoryMock,
} from '../__mocks__/NodeCourseRepositoryMock.js'
import {
  CourseCreatedDomainEventMother,
  CourseMother,
} from '../domain/index.js'
import {
  CreateCourseRequestMother,
} from './CreateCourseRequestMother.js'

let repository: NodeCourseRepositoryMock
let creator: CourseCreator
let eventBus: NodeEventBusMock

beforeEach(() => {
  repository = new NodeCourseRepositoryMock()
  eventBus = new NodeEventBusMock()
  creator = new CourseCreator(repository, eventBus)
})

describe('CourseCreator', () => {
  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random()
    const course = CourseMother.fromRequest(request)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)
    // await creator.run(request)
    // Promise<void> | it means a side effect
    // Paso de mensaje y colaboración
    await creator.run({
      id: new CourseId(request.id),
      name: new CourseName(request.name),
      duration: !isUndefined(request.duration) ? new CourseDuration(request.duration) : undefined,
    })
    repository.assertLastSavedCourseIs(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', async () => {
    const request = CreateCourseRequestMother.invalidRequest()
    await assert.rejects(async () => {
      const course = CourseMother.fromRequest(request)
      await creator.run({
        id: new CourseId(request.id),
        name: new CourseName(request.name),
        duration: !isUndefined(request.duration) ? new CourseDuration(request.duration) : undefined,
      })
      repository.assertSaveHaveBeenCalledWith(course)
    }, CourseNameLengthExceeded)
  })
})
