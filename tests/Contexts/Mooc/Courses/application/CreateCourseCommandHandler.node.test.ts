import 'reflect-metadata'

import assert from 'node:assert/strict'
import { beforeEach, describe, it } from 'node:test'

import { CourseCreator, CreateCourseCommandHandler } from '@/Contexts/Mooc/Courses/application/index.js'
import { CourseNameLengthExceeded } from '@/Contexts/Mooc/Courses/domain/index.js'

import { NodeEventBusMock } from '../../Shared/NodeEventBusMock.js'
import { NodeCourseRepositoryMock } from '../__mocks__/NodeCourseRepositoryMock.js'
import { CourseCreatedDomainEventMother, CourseMother } from '../domain/index.js'
import { CreateCourseCommandMother } from './CreateCourseCommandMother.js'

let repository: NodeCourseRepositoryMock
let creator: CourseCreator
let eventBus: NodeEventBusMock
let handler: CreateCourseCommandHandler

beforeEach(() => {
  repository = new NodeCourseRepositoryMock()
  eventBus = new NodeEventBusMock()
  creator = new CourseCreator(repository, eventBus)
  handler = new CreateCourseCommandHandler(creator)
})

describe('CreateCourseCommandHandler', () => {
  it('should create a valid course', async () => {
    const command = CreateCourseCommandMother.random()
    const course = CourseMother.from(command)
    const domainEvent = CourseCreatedDomainEventMother.fromCourse(course)

    await handler.handle(command)

    repository.assertLastSavedCourseIs(course)
    repository.assertSaveHaveBeenCalledWith(course)
    eventBus.assertLastPublishedEventIs(domainEvent)
  })

  it('should throw error if course name length is exceeded', async () => {
    const command = CreateCourseCommandMother.invalid()

    await assert.rejects(async () => {
      const course = CourseMother.from(command)
      await handler.handle(command)
      repository.assertSaveHaveBeenCalledWith(course)
    }, CourseNameLengthExceeded)
  })
})
