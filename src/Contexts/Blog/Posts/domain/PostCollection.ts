import {
  Post,
} from './Post.js'

export class PostCollection extends Array<Post> {
  get posts() {
    return this.sorted
  }

  private get sorted(): PostCollection {
    return super.sort((a, b) => b.date.getTime() - a.date.getTime())
  }
}
