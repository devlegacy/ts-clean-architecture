import { Post, PostRepository } from '../domain'

export class PostUseCase {
  constructor(private readonly repository: PostRepository) {}

  async publishPost(id: Post['id'], author: Post['author'], content: Post['content'], date: Post['date']) {
    const post = new Post(id, author, content, date)
    await this.repository.save(post)
  }

  async readPost(author: Post['author']) {
    const posts = await this.repository.getAllByAuthor(author)

    return posts
  }
}
