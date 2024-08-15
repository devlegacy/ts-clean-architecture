export class PostLatestLike {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly userName: string,
    public readonly profilePictureUrl: string,
    public readonly likedAt: Date,
  ) {}

  static create(
    id: string,
    userId: string,
    userName: string,
    profilePictureUrl: string,
    likedAt: Date,
  ): PostLatestLike {
    return new PostLatestLike(id, userId, userName, profilePictureUrl, likedAt)
  }

  static fromPrimitives(primitives: Primitives<PostLatestLike>): PostLatestLike {
    return new PostLatestLike(
      primitives.id,
      primitives.userId,
      primitives.userName,
      primitives.profilePictureUrl,
      primitives.likedAt,
    )
  }

  toPrimitives(): Primitives<PostLatestLike> {
    return {
      id: this.id,
      userId: this.userId,
      userName: this.userName,
      profilePictureUrl: this.profilePictureUrl,
      likedAt: this.likedAt,
    }
  }
}
