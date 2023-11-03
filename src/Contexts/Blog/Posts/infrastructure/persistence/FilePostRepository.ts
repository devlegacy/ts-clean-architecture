import { deserialize, serialize } from 'bson'
import { existsSync, mkdirSync, readdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

import { Post, PostCollection, type PostRepository } from '../../domain/index.js'

export class FilePostRepository implements PostRepository {
  private FILE_PATH = `${__dirname}/Posts`

  constructor() {
    this.ensureDirectoryExistence()
  }

  async save(post: Post): Promise<void> {
    await writeFile(this.path(post.id), serialize(post.toPrimitives()))
  }

  async getAllByAuthor(author: Post['author']): Promise<PostCollection> {
    const files = readdirSync(this.FILE_PATH)
    const collection = new PostCollection()

    // forEach doesn't work
    for (let file of files) {
      file = this.path(file.replace(/\.repo$/, ''))
      const read = await readFile(file)
      const { id, content, date, ...deserialized } = deserialize(read)
      if (deserialized.author !== author) continue
      collection.push(
        Post.fromPrimitives({
          id,
          content,
          author: deserialized.author,
          date,
        })
      )
    }

    return collection.posts
  }

  private ensureDirectoryExistence() {
    const path = this.FILE_PATH
    if (existsSync(path)) {
      return true
    }
    mkdirSync(path, { recursive: true })
  }

  private path(id: string) {
    return `${this.FILE_PATH}/${id}.repo`
  }
}
