import assert from 'node:assert/strict'
import {
  type Mock,
  mock,
} from 'node:test'

import type {
  Post,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/Post.js'
import {
  PostRepository,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/PostRepository.js'

export class MockPostRepository implements PostRepository {
  private readonly mockSave: Mock<typeof PostRepository.prototype.save> = mock.fn()
  private readonly mockSearch: Mock<typeof PostRepository.prototype.search> = mock.fn()

  async save(post: Post): Promise<void> {
    // expect(this.mockSave).toHaveBeenCalledWith(post.toPrimitives())
    assert.deepEqual(this.mockSave.mock.calls[0]?.arguments?.at(0)?.toPrimitives(), post.toPrimitives())
    await Promise.resolve()
  }

  async search(id: Post['id']): Promise<Post | null> {
    // expect(this.mockSearch).toHaveBeenCalledWith(id)
    assert.deepEqual(this.mockSearch.mock.calls[0]?.arguments?.at(0), id)
    return this.mockSearch(id)
  }

  shouldSearchAndReturnNull(id: Post['id']): void {
    this.mockSearch(id)
    // this.mockSearch.mockReturnValueOnce(null)
    this.mockSearch.mock.mockImplementationOnce(() => null as unknown as Promise<Post | null>)
  }

  shouldSave(post: Post): void {
    // this.mockSave(post.toPrimitives())
    this.mockSave(post)
  }

  shouldSearch(post: Post): void {
    this.mockSearch(post.id)
    // this.mockSearch.mockReturnValueOnce(post)
    this.mockSearch.mock.mockImplementationOnce(() => post as unknown as Promise<Post | null>)
  }
}
