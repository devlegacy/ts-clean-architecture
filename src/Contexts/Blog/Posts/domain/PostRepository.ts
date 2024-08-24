import {
  Post,
} from './Post.js'
import {
  PostCollection,
} from './PostCollection.js'

export interface PostRepository {
  save(post: Post): Promise<void>

  getAllByAuthor(author: Post['author']): Promise<PostCollection>
}
