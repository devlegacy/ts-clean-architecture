import {
  PostLatestLike,
  PostLatestLikes,
} from '#@/src/Contexts/SocialNetwork/Posts/domain/ValueObjects/index.js'

export class PostLatestLikesMother {
  static create(latestLikes: Primitives<PostLatestLike>[]): PostLatestLikes {
    return PostLatestLikes.fromPrimitives({
      latestLikes,
    })
  }

  static one(latestLikes: Primitives<PostLatestLike>): PostLatestLikes {
    return PostLatestLikes.fromPrimitives({
      latestLikes: [
        latestLikes,
      ],
    })
  }

  static empty(): PostLatestLikes {
    return PostLatestLikes.fromPrimitives({
      latestLikes: [],
    })
  }
}
