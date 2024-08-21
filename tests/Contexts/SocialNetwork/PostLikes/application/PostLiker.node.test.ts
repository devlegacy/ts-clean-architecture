import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  PostLiker,
} from '#@/src/Contexts/SocialNetwork/PostLikes/application/PostLiker.js'
import {
  PostFinder,
} from '#@/src/Contexts/SocialNetwork/Posts/application/PostFinder.js'
import {
  PostDoesNotExistError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/PostDoesNotExistError.js'
import {
  UserDoesNotExistError,
} from '#@/src/Contexts/SocialNetwork/Users/domain/Errors/UserDoesNotExistError.js'
import {
  UserFinder,
} from '#@/src/Contexts/SocialNetwork/Users/domain/UserFinder.js'
import {
  MockClock,
} from '#@/tests/Contexts/Shared/infrastructure/MockClock.js'
import {
  MockEventBus,
} from '#@/tests/Contexts/Shared/infrastructure/MockEventBus.js'

import {
  PostIdMother,
} from '../../Posts/domain/PostIdMother.js'
import {
  PostMother,
} from '../../Posts/domain/PostMother.js'
import {
  MockPostRepository,
} from '../../Posts/infrastructure/MockPostRepository.js'
import {
  UserIdMother,
} from '../../Users/domain/UserIdMother.js'
import {
  UserMother,
} from '../../Users/domain/UserMother.js'
import {
  MockUserRepository,
} from '../../Users/infrastructure/MockUserRepository.js'
import {
  PostLikedDomainEventMother,
} from '../domain/PostLikedDomainEventMother.js'
import {
  PostLikeIdMother,
} from '../domain/PostLikeIdMother.js'
import {
  PostLikeMother,
} from '../domain/PostLikeMother.js'
import {
  MockPostLikeRepository,
} from '../infrastructure/MockPostLikeRepository.js'

let postRepository: MockPostRepository
let userRepository: MockUserRepository

let clock: MockClock
let repository: MockPostLikeRepository
let eventBus: MockEventBus

let postLiker: PostLiker

beforeEach(() => {
  postRepository = new MockPostRepository()
  userRepository = new MockUserRepository()

  clock = new MockClock()
  repository = new MockPostLikeRepository()
  eventBus = new MockEventBus()

  postLiker = new PostLiker(
    new PostFinder(postRepository),
    new UserFinder(userRepository),
    clock,
    repository,
    eventBus,
  )
})

describe('PostLiker should', () => {
  it('throw an error liking a non existing post', async () => {
    const postId = PostIdMother.create()

    const expectedError = new PostDoesNotExistError(postId.value)

    postRepository.shouldSearchAndReturnNull(postId)

    // await expect(
    //   postLiker.run(PostLikeIdMother.create().value, postId.value, UserIdMother.create().value),
    // ).rejects.toThrow(expectedError)
    await assert.rejects(
      async () => {
        await postLiker.run(PostLikeIdMother.create().value, postId.value, UserIdMother.create().value)
      },
      expectedError,
    )
  })

  it('throw an error liking a post when the liker does not exist', async () => {
    const existingPost = PostMother.create()
    const likerUserId = UserIdMother.create()

    const expectedError = new UserDoesNotExistError(likerUserId.value)

    postRepository.shouldSearch(existingPost)
    userRepository.shouldSearchAndReturnNull(likerUserId)

    // await expect(
    //   postLiker.run(PostLikeIdMother.create().value, existingPost.id.value, likerUserId.value),
    // ).rejects.toThrow(expectedError)
    await assert.rejects(
      async () => {
        await postLiker.run(PostLikeIdMother.create().value, existingPost.id.value, likerUserId.value)
      },
      expectedError,
    )
  })

  it('like a post', async () => {
    const expectedPostLike = PostLikeMother.create()
    const expectedPostLikePrimitives = expectedPostLike.toPrimitives()

    const expectedDomainEvent = PostLikedDomainEventMother.create(expectedPostLikePrimitives)

    postRepository.shouldSearch(PostMother.create({
      id: expectedPostLike.postId.value,
    }))
    userRepository.shouldSearch(UserMother.create({
      id: expectedPostLike.userId.value,
    }))

    clock.shouldGenerate(expectedPostLike.likedAt)
    repository.shouldSave(expectedPostLike)
    eventBus.shouldPublish([
      expectedDomainEvent,
    ])

    await postLiker.run(
      expectedPostLikePrimitives.id,
      expectedPostLikePrimitives.postId,
      expectedPostLikePrimitives.userId,
    )
  })
})
