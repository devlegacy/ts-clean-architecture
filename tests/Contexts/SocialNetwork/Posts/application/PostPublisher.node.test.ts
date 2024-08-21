import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  faker,
} from '@faker-js/faker'

import {
  PostPublisher,
} from '#@/src/Contexts/SocialNetwork/Posts/application/PostPublisher.js'
import {
  PostContentIsEmptyError,
  PostContentTooLongError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/index.js'
import {
  MockClock,
  MockEventBus,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

import {
  UserIdMother,
} from '../../Users/domain/UserIdMother.js'
import {
  PostIdMother,
} from '../domain/PostIdMother.js'
import {
  PostMother,
} from '../domain/PostMother.js'
import {
  PostPublishedDomainEventMother,
} from '../domain/PostPublishedDomainEventMother.js'
import {
  MockPostRepository,
} from '../infrastructure/MockPostRepository.js'

let clock: MockClock
let repository: MockPostRepository
let eventBus: MockEventBus

let postPublisher: PostPublisher

beforeEach(() => {
  clock = new MockClock()
  repository = new MockPostRepository()
  eventBus = new MockEventBus()

  postPublisher = new PostPublisher(clock, repository, eventBus)
})

describe('PostPublisher should', () => {
  it('throw an error publishing an empty post', async () => {
    const postId = PostIdMother.create()
    const userId = UserIdMother.create()

    const postContent = ''

    const expectedError = new PostContentIsEmptyError()

    await assert.rejects(
      async () => {
        await postPublisher.run(postId.value, userId.value, postContent)
      },
      expectedError,
    )
  })

  it('throw an error publishing a too long post', async () => {
    const postId = PostIdMother.create()
    const userId = UserIdMother.create()

    const maxPostLength = 280
    const postContent = faker.string.alpha({
      length: maxPostLength + 1,
    })

    const expectedError = new PostContentTooLongError(postContent, maxPostLength)
    await assert.rejects(
      async () => {
        await postPublisher.run(postId.value, userId.value, postContent)
      },
      expectedError,
    )
  })
  it('publish a valid post', async () => {
    const expectedPost = PostMother.createNew()
    const expectedPostPrimitives = expectedPost.toPrimitives()

    const expectedDomainEvent = PostPublishedDomainEventMother.create(expectedPostPrimitives)

    clock.shouldGenerate(expectedPost.createdAt)
    repository.shouldSave(expectedPost)
    eventBus.shouldPublish([
      expectedDomainEvent,
    ])

    await postPublisher.run(
      expectedPostPrimitives.id,
      expectedPostPrimitives.userId,
      expectedPostPrimitives.content,
    )
  })
})
