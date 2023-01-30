import { PostUseCase } from '@/Contexts/Blog/Posts/application'
import { InMemoryPostRepository } from '@/Contexts/Blog/Posts/infrastructure'
import { UuidMother } from '@/tests/Contexts/Shared/domain'

describe(`Blog use case`, () => {
  describe('Blog TestAdapter', () => {
    let testAdapter: PostUseCase
    let repositoryAdapter: InMemoryPostRepository
    beforeEach(() => {
      repositoryAdapter = new InMemoryPostRepository()
      testAdapter = new PostUseCase(repositoryAdapter)
    })

    it('should store a post', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date().getTime())
      const posts = await testAdapter.readPost('John')

      expect(posts.pop()?.content).toBe('Hello blog')
    })

    it('should retrieve all author posts', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date().getTime())
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog 2', new Date().getTime())
      const posts = await testAdapter.readPost('John')
      expect(posts).toHaveLength(2)
    })

    it('should retrieve all author posts sorted by descending date', async () => {
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog', new Date().getTime())
      await new Promise((resolve) => setTimeout(resolve, 10))
      await testAdapter.publishPost(UuidMother.random(), 'John', 'Hello blog 2', new Date().getTime())
      const posts = await testAdapter.readPost('John')
      expect(posts.shift()!.date).toBeGreaterThan(posts.pop()!.date)
    })
  })
})
