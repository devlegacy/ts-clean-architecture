import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import {
  PostLike,
  PostLikeId,
} from '#@/src/Contexts/SocialNetwork/PostLikes/domain/index.js'
import {
  PostLikeRepository,
} from '#@/src/Contexts/SocialNetwork/PostLikes/domain/PostLikeRepository.js'

export class MockPostLikeRepository implements PostLikeRepository {
  private readonly mockSave: Mock<typeof PostLikeRepository.prototype.save> = mock.fn()
  private readonly mockSearch: Mock<typeof PostLikeRepository.prototype.search> = mock.fn()

  async save(post: PostLike): Promise<void> {
    // expect(this.mockSave).toHaveBeenCalledWith(post.toPrimitives())
    assert.deepEqual(this.mockSave.mock.calls[0]?.arguments?.at(0)?.toPrimitives(), post.toPrimitives())

    return Promise.resolve()
  }

  async search(id: PostLikeId): Promise<PostLike | null> {
    // expect(this.mockSearch).toHaveBeenCalledWith(id)
    assert.deepEqual(this.mockSearch.mock.calls[0]?.arguments?.at(0), id)
    return this.mockSearch(id)
  }

  shouldSave(post: PostLike): void {
    // this.mockSave(post.toPrimitives())
    this.mockSave(post)
  }

  shouldSearch(post: PostLike): void {
    this.mockSearch(post.id)
    // this.mockSearch.mockReturnValueOnce(post)
    this.mockSearch.mock.mockImplementationOnce(() => post as unknown as Promise<PostLike | null>)
  }
}
