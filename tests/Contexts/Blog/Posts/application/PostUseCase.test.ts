import { PostUseCase } from '@/Contexts/Blog/Posts/application/index.js'
import { InMemoryPostRepository } from '@/Contexts/Blog/Posts/infrastructure/index.js'
import { TestUtil, UuidMother } from '@/tests/Contexts/Shared/domain/index.js'

describe(`Blog use case, ${TestUtil.getPackagePath(__dirname)}`, () => {
  describe('Blog TestAdapter', () => {
    let testAdapter: PostUseCase
    let repositoryAdapter: InMemoryPostRepository
    beforeEach(() => {
      repositoryAdapter = new InMemoryPostRepository()
      testAdapter = new PostUseCase(repositoryAdapter)
    })

    it('should store a post', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date())
      const posts = await testAdapter.readPost('John')

      expect(posts.pop()?.content).toBe('Hello blog')
    })

    it('should retrieve all author posts', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date())
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog 2', new Date())
      const posts = await testAdapter.readPost('John')
      expect(posts).toHaveLength(2)
    })

    it('should retrieve all author posts sorted by descending date', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date())
      await TestUtil.wait(10)
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog 2', new Date())
      const posts = await testAdapter.readPost('John')
      expect(posts.shift()!.date.getTime()).toBeGreaterThan(posts.pop()!.date.getTime())
    })
  })
})
