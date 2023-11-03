import { Post, PostCollection, type PostRepository } from '../../domain/index.js'

export class InMemoryPostRepository implements PostRepository {
  private readonly posts = new PostCollection()
  async save(post: Post): Promise<void> {
    this.posts.push(post)
  }

  async getAllByAuthor(author: string): Promise<PostCollection> {
    const posts = this.posts.posts.filter((post) => post.author === author)
    return posts as PostCollection
  }
}
