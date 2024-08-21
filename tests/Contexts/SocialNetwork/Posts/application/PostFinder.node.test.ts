import assert from 'node:assert/strict'
import {
  beforeEach,
  describe,
  it,
} from 'node:test'

import {
  PostFinder,
} from '#@/src/Contexts/SocialNetwork/Posts/application/PostFinder.js'
import {
  PostDoesNotExistError,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Errors/PostDoesNotExistError.js'

import {
  PostIdMother,
} from '../domain/PostIdMother.js'
import {
  PostMother,
} from '../domain/PostMother.js'
import {
  MockPostRepository,
} from '../infrastructure/MockPostRepository.js'

let repository: MockPostRepository
let finder: PostFinder

beforeEach(() => {
  repository = new MockPostRepository()
  finder = new PostFinder(repository)
})

describe('PostFinder should', () => {
  // const repository = new MockPostRepository()
  // const finder = new PostFinder(repository)

  it('throw an error finding a non existing post', async () => {
    const postId = PostIdMother.create()

    const expectedError = new PostDoesNotExistError(postId.value)

    repository.shouldSearchAndReturnNull(postId)

    // await expect(finder.run(postId.value)).rejects.toThrow(expectedError)
    await assert.rejects(
      async () => {
        await finder.run(postId.value)
      },
      expectedError,
    )
  })

  it('find an existing post', async () => {
    const post = PostMother.create()

    repository.shouldSearch(post)

    // expect(await finder.run(post.id.value)).toEqual(post.toPrimitives())
    assert.deepEqual((await finder.run(post.id.value)).toPrimitives(), post.toPrimitives())
    assert.deepEqual(true, true)
  })
})
