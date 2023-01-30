import { Post } from './Post'

export class PostCollection extends Array<Post> {
  get posts() {
    return this.sorted
  }

  private get sorted(): PostCollection {
    return super.sort((a, b) => b.date - a.date)
  }
}
