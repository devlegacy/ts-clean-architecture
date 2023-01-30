import { Post } from './Post'
import { PostCollection } from './PostCollection'

export interface PostRepository {
  save(post: Post): Promise<void>

  getAllByAuthor(author: Post['author']): Promise<PostCollection>
}
