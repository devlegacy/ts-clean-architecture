export class Post {
  readonly date: Date

  constructor(
    readonly id: string,
    readonly author: string,
    readonly content: string,
    date: number = new Date().getTime()
  ) {
    this.date = new Date(date)
  }

  static fromPrimitives(data: ReturnType<typeof Post.prototype.toPrimitives>): Post {
    const post = new Post(data.id, data.author, data.content, data.date)

    return post
  }

  toPrimitives() {
    const post = {
      id: this.id,
      content: this.content,
      author: this.author,
      date: this.date.getTime(),
    }

    return post
  }
}
