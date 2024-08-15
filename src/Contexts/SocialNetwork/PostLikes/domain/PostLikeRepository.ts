export abstract class PostLikeRepository {
  abstract save(user: PostLike): Promise<void>

  abstract search(id: PostLikeId): Promise<PostLike | null>
}
